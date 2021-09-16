const Apify = require('apify');
const { handleList, handleVideo, handleUser } = require('./routes');

const { utils: { log } } = Apify;

Apify.main(async () => {
    // TODO: maxItems, extendedOutputFunction
    const { startUrls, searchTerms, proxyConfiguration } = await Apify.getInput();
    if (!startUrls || !searchTerms) {
        throw new Error('Input must contain startUrl or searchTerm.');
    }

    const proxyConfig = await Apify.createProxyConfiguration(proxyConfiguration);

    const requestList = await Apify.openRequestList('start-urls', startUrls);
    const requestQueue = await Apify.openRequestQueue();
    if (searchTerms) {
        for (const searchTerm of searchTerms) {
            // remove all white spaces from searchTerm
            searchTerm.replaceAll(/\s/g, '');
            await requestQueue.addRequest({
                url: `https://www.tiktok.com/tag/${searchTerm}`,
            });
        }
    }

    const crawler = new Apify.PuppeteerCrawler({
        maxRequestRetries: 10,
        requestList,
        requestQueue,
        proxyConfiguration: proxyConfig,
        maxConcurrency: 30,
        useSessionPool: true,
        persistCookiesPerSession: true,
        launchContext: {
            useChrome: true,
            stealth: true,
        },
        handlePageFunction: async (context) => {
            const { url, userData: { label } } = context.request;
            log.info(`${context.response.status()}|${label}|${url}`);
            const title = await context.page.$eval('title', (titl) => titl.innerText.trim());
            if (title.includes('Something went wrong')
                || title.includes('Robot Check')
                || title.includes('verify')) {
                // retire the session
                context.session.retire();
                throw new Error(`${url} was blocked and needs to retry.`);
            }
            switch (label) {
                case 'USER':
                    return handleUser(context, requestQueue);
                case 'VIDEO':
                    return handleVideo(context);
                default:
                    return handleList(context, requestQueue);
            }
        },
        handleFailedRequestFunction: async (context) => {
            log.error(`Request failed too many times --- ${context.url}`);
        },
    });

    log.info('Starting the crawl.');
    await crawler.run();
    log.info('Crawl finished.');
});
