const Apify = require('apify');
const { parseXhrResponseItem, retireOnBlocked, parseResults } = require('./tools');

const { utils: { log } } = Apify;

exports.handleList = async (request, page, resultsPerPage, session, browserPool, progress) => {
    // TikTok has first 6 videos loaded by a script, more are loaded by XHR requests
    const maxResultsWithoutOffset = resultsPerPage - 6;
    let waitingForResponse = true;
    // number of results already pushed to dataset in batches
    let outputLength = 0;
    let pushedDataLength = 0;
    // compute dynamically a period of time needed for the videos to be scraped (500 mls for 1 video)
    const timeout = resultsPerPage > 60 ? resultsPerPage * 500 : 30000;

    const matchXhrResponse = async (xhrResponse) => {
        return (xhrResponse.request().method() === 'GET'
            && (// request from hashtag search
                xhrResponse.url().includes('https://m.tiktok.com/api/challenge/item_list/')
                // request from profile
                || xhrResponse.url().includes('https://m.tiktok.com/api/post/item_list/')
            )
        );
    }

    while (waitingForResponse) {
        // the browser needs to be restarted when no response is awaited
        let xhrResponse = null;
        try {
            // waiting for XHR request response containing data about videos and scrolling for more results
             [xhrResponse] = await Promise.all([
                page.waitForResponse(matchXhrResponse, { timeout: timeout }),
                page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
            ]);
        } catch (e) {
            await retireOnBlocked(session, browserPool, request, e);
        }

        log.info(`[${request.userData.label}] XHR response received, parsing results... --- ${request.url}`);

        const result = await xhrResponse.json();
        if (result.itemList) {
            const parsedResults = parseResults(result.itemList, progress);
            pushedDataLength += parsedResults.length;
            // only ignore the streak of already pushed videos to reach the correct number of results
            // TiTok has a bug, when it fires the same request two times, it caused less results on output than expected
            if (pushedDataLength > 0) {
                outputLength += parsedResults.length
            } else {
                outputLength += result.itemList.length;
            }
            console.log(`DEBUG: Got ${result.itemList.length} items and scraped ${parsedResults.length} of them - ${pushedDataLength} pushed in total / ${outputLength} received in total`);

            // persist ids of scraped videos
            progress = {
                ...progress,
                ...parsedResults
                    .reduce((ids, result) => {
                        ids.push(result.id);
                        return ids;
                    }, [])
                    .reduce((ids, id) => ({...ids, [id]:id}), {}),
            }
            if (outputLength < maxResultsWithoutOffset) {
                // make pushing and persisting atomic
                await Promise.all([
                    Apify.pushData(parsedResults),
                    Apify.setValue('PROGRESS', progress),
                ]);
            } else {
                log.info(`[${request.userData.label}] Scraped ${maxResultsWithoutOffset} videos. Scrolling finished.  --- ${request.url}`);
                // remove superfluous results from the end of parsedResults
                await Promise.all([
                    Apify.pushData(parsedResults.splice(0, (parsedResults.length - (outputLength - maxResultsWithoutOffset)))),
                    Apify.setValue('PROGRESS', progress),
                ]);
                waitingForResponse = false;
            }
        } else {
            throw new Error('XHR response was corrupted. Request needs to be retried.');
        }

        if (waitingForResponse) {
            log.info(`[${request.userData.label}] Scraped ${outputLength} videos. Scrolling down for more results...  --- ${request.url}`);
        }

        if(!result.hasMore) {
            log.info(`[${request.userData.label}] Scraped only ${outputLength} videos from ${maxResultsWithoutOffset}, but this list doesn't have more. Scrolling finished.  --- ${request.url}`);
            waitingForResponse = false;
        }
    }

    // first 6 (or less depends on the posted content) videos are loaded by a script
    let loadedData = await page.evaluate(() => document.querySelector('script[id=__NEXT_DATA__]')?.innerHTML);
    // the page should be loaded, but doesn't have scripts available, probably some kind of blocking
    if (!loadedData){
        await retireOnBlocked(session, browserPool, request, new Error(`The page doesn\'t have scripts available --- ${request.url}`));
    }else{
        loadedData = JSON.parse(loadedData);
    }
    const firstVideos = loadedData.props.pageProps.items;

    // The response wasn't received and it's an error when resultsPerPage are set higher than 6
    // and there is more content then 6 videos
    if (outputLength === 0 && resultsPerPage > 6 && firstVideos.length === 6) {
        if (request.userData.label !== 'PROFILE') {
            throw new Error(`XHR response wasn't received, request needs to retry.`);
        } else {
            // when the user profile has exactly 6 videos don't throw error
            if (firstVideos[0].authorStats.videoCount > 6){
                throw new Error(`XHR response wasn't received, request needs to retry.`);
            }
        }
    }
    // handle first videos from the page
    if (firstVideos) {
        log.info(`[${request.userData.label}] Scraped first ${firstVideos.length} videos.  --- ${request.url}`);
        //sometimes there is more than 6 videos loaded, so the array has to be truncated, because we already scraped
        // all videos with index > 6
        const firstSixVideos = firstVideos.splice(0,6);
        await Apify.pushData(parseResults(firstSixVideos));
    } else {
        throw new Error('Loading of the first videos was unsuccessful and request needs to be retried.');
    }
    log.info(`[${request.userData.label}] Request finished successfully --- ${request.url}`);
};

exports.handlePost = async (request, page, session, browserPool) => {
    let loadedData = await page.evaluate(() => document.querySelector('script[id=__NEXT_DATA__]')?.innerHTML);
    // the page should be loaded, but doesn't have scripts available, probably some kind of blocking
    if (!loadedData){
        await retireOnBlocked(session, browserPool, request, new Error(`The page doesn\'t have scripts available --- ${request.url}`));
    } else {
        loadedData = JSON.parse(loadedData);
    }
    const video = loadedData.props.pageProps.itemInfo.itemStruct;
    if (video) {
        log.info(`[${request.userData.label}] Video scraped.  --- ${request.url}`);
    } else {
        throw new Error(`Something went wrong when scraping post --- ${request.url}.`);
    }
    log.info(`[${request.userData.label}] Pushing result into dataset...  --- ${request.url}`);
    await Apify.pushData(parseXhrResponseItem(video));
};
