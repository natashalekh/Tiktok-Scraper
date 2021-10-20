const Apify = require('apify');

const { utils: { log } } = Apify;

/**
 * Parses XHR json data to appropriate output form.
 * @param xhrData Item to be parsed.
 */
const parseXhrResponseItem = (xhrData) => {
    return {
        id: xhrData.id,
        text: xhrData.desc,
        createTime: xhrData.createTime,
        authorMeta: {
            id: xhrData.author.id,
            name: xhrData.author.uniqueId,
            nickName: xhrData.author.nickname,
            verified: xhrData.author.verified,
            signature: xhrData.author.signature,
            avatar: xhrData.author.avatarMedium,
            following: xhrData.authorStats.followingCount,
            fans: xhrData.authorStats.followerCount,
            heart: xhrData.authorStats.heart,
            video: xhrData.authorStats.videoCount,
            digg: xhrData.authorStats.diggCount,
        },
        musicMeta: {
            musicName: xhrData.music.title,
            musicAuthor: xhrData.music.authorName,
            musicOriginal: xhrData.music.original,
            musicAlbum: xhrData.music.album,
            playUrl: xhrData.music.playUrl,
        },
        webVideoUrl: `https://www.tiktok.com/@${xhrData.author.uniqueId}/video/${xhrData.id}`,
        videoUrl: xhrData.video.downloadAddr,
        videoMeta: {
            height: xhrData.video.height,
            width: xhrData.video.width,
            duration: xhrData.video.duration,
        },
        diggCount: xhrData.stats.diggCount,
        shareCount: xhrData.stats.shareCount,
        playCount: xhrData.stats.playCount,
        commentCount: xhrData.stats.commentCount,
        downloaded: false,
        // matches all mentions beginning with @ from description
        mentions: xhrData.desc.match(/(@[^\s@]{1,})/g) || [],
        hashtags: parseHashtagsFromXhrItem(xhrData),
        effectStickers: xhrData.effectStickers,
    };
};

/**
 * Matches hashtags with challenges by id and merges the result into appropriate output form.
 * @param xhrData Item, which hashtags should be matched and merged.
 * @returns {[]}
 */
const parseHashtagsFromXhrItem = (xhrData) => {
    const hashtags = [];
    if (xhrData.textExtra) {
        for (const hashtag of xhrData.textExtra) {
            if (hashtag.hashtagId) {
                for (const challenge of xhrData.challenges) {
                    // there should always be challenge for every hashtag
                    if (challenge.id === hashtag.hashtagId) {
                        hashtags.push({
                            id: hashtag.hashtagId,
                            name: hashtag.hashtagName,
                            title: challenge.desc,
                            cover: challenge.coverMedium,
                        });
                        break;
                    }
                }
            }
        }
    }
    return hashtags;
};

/**
 * Retires current session, browser and makes request retry.
 * @param session Current session to be retired.
 * @param browserPool Crawler's browserPool.
 * @param request Current handled request.
 * @param error Error to be thrown.
 */
exports.retireOnBlocked = async (session, browserPool, request, error) => {
    // retire the session and switch browsers
    log.exception(`[Blocked]: [${request.userData.label}]: ${request.url} was probably blocked, waiting before retrying.`);
    session.retire();
    await browserPool.retireAllBrowsers();
    throw error;
};

/**
 * Parses an array of xhrData items and filters the ones that have been already scraped.
 * @param results Array of items to be parsed.
 * @param progress Set of already scraped items.
 * @returns {[]}
 */
exports.parseResults = (results, progress = []) => {
    const output = [];
    for (const result of results) {
        if (!progress[result.id]) {
            output.push(parseXhrResponseItem(result));
        }
    }
    return output;
};

exports.parseXhrResponseItem = parseXhrResponseItem;
