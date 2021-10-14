const Apify = require('apify');
const { handleList, handlePost } = require('./routes');
const { proxyConfiguration } = require('./proxyValidation');

const { utils: { log } } = Apify;

Apify.main(async () => {
    const input = await Apify.getInput();
    const { postURLs, hashtags, profiles, resultsPerPage, maxConcurrency, maxRequestRetries } = input;
    // input check
    if (!postURLs && !hashtags && !profiles) {
        throw new Error('Input must contain postURLs, hashtags or profiles.');
    } else if (hashtags || profiles) {
        if (!resultsPerPage) {
            throw new Error('Please, specify the number of results, which should be extracted from hashtag or profile page.');
        }
    }

    const proxyConfig = await proxyConfiguration({
        proxyConfig: input.proxyConfiguration,
    });

    const startingUrls = [];
    // enqueue post urls
    if (postURLs) {
        for (const postURL of postURLs) {
            startingUrls.push({
                url: postURL,
                userData: {
                    label: 'VIDEO',
                },
            });
        }
    }
    // enqueue hashtag urls
    if (hashtags) {
        for (const hashtag of hashtags) {
            // remove all white spaces from hashtag
            hashtag.replaceAll(/\s/g, '');
            startingUrls.push({
                url: `https://www.tiktok.com/tag/${hashtag}`,
                userData: {
                    label: 'HASHTAG',
                },
            });
        }
    }
    // enqueue profiles urls
    if (profiles) {
        for (const profile of profiles) {
            // remove all white spaces from profile
            profile.replaceAll(/\s/g, '');
            startingUrls.push({
                url: `https://www.tiktok.com/@${profile}?`,
                userData: {
                    label: 'PROFILE',
                },
            });
        }
    }

    const requestList = await Apify.openRequestList('start-urls', startingUrls);

    const crawler = new Apify.PuppeteerCrawler({
        // the function needs enough time for scrolling and loading videos
        handlePageTimeoutSecs: resultsPerPage,
        maxRequestRetries,
        requestList,
        proxyConfiguration: proxyConfig,
        maxConcurrency,
        useSessionPool: true,
        persistCookiesPerSession: true,
        launchContext: {
            useChrome: true,
            stealth: true,
        },
        preNavigationHooks: [
            async ({ request }, gotoOptions) => {
                if (request.userData.label === 'VIDEO') {
                    gotoOptions.waitUntil = 'load';
                } else {
                    gotoOptions.waitUntil = 'domcontentloaded';
                }
            },
        ],
        handlePageFunction: async ({ page, session, request, response, crawler }) => {
            const { url, userData: { label } } = request;
            log.info(`${response.status()}|${label}|${url}`);

            // get persisted progress info for each request
            let progress = await Apify.getValue('PROGRESS');
            if (!progress) {
                // ids of already scraped videos
                progress = {};
            }

            // check for blocking
            const title = await page.evaluate(() => document.querySelector('title')?.innerText.trim());
            if (title.includes('Something went wrong')
                || title.includes('Robot Check')
                || title.includes('verify')
                || title === 'TikTok') {
                // retire the session
                session.retire();
                throw new Error(`${url} was blocked and needs to retry.`);
            }

            // If the page is not found do nothing.
            if (response.status() === 404) {
                log.info(`Stopping with not found --- ${response.status()} - ${url}`);
            }

            switch (label) {
                case 'PROFILE':
                    return handleList(request, page, resultsPerPage, session, crawler.browserPool, progress);
                case 'HASHTAG':
                    return handleList(request, page, resultsPerPage, session, crawler.browserPool, progress);
                case 'VIDEO':
                    return handlePost(request, page, session, crawler.browserPool);
                default:
                    throw new Error(`${label} is unknown.`);
            }
        },
        handleFailedRequestFunction: async ({request}) => {
            log.error(`Request failed too many times --- ${request.url}`);
        },
    });

    log.info('Starting the crawl.');
    await crawler.run();
    log.info('Crawl finished.');
});
