const Apify = require('apify');

const { utils: { log } } = Apify;

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

exports.retireOnBlocked = async (session, browserPool, request) => {
    // retire the session and switch browsers
    log.info(`[Blocked]: [${request.userData.label}]: ${request.url} was probably blocked, waiting before retrying.`)
    session.retire();
    await browserPool.retireAllBrowsers();
    throw new Error(`${request.url} was blocked and needs to retry.`)
};

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
