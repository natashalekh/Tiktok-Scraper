(This actor is a first and minimal version. It will be soon upgraded with better functionality.)

### TikTok Scraper

TikTok Scraper is an [Apify actor](https://apify.com/actors) for extracting data about videos from social media site [TikTok](https://www.tiktok.com/).
It allows you to extract detailed information about videos and users/channels that posted them.
It is build on top of [Apify SDK](https://sdk.apify.com/) and you can run it both on [Apify platform](https://my.apify.com) and locally.


This minimal version currently scrapes all urls and hashtags provided on input with only 36 videos on output for each of them.

- [Output](#output)

### Output

Output is stored in a dataset. Each item is an information about video and user/channel. Example:

```
{
  "searchHashtag": "cockatiel",
  "numberOfViewsOnHashtag": "344M",
  "userUrl": "https://www.tiktok.com/@calopsitas_mansa",
  "following": "435",
  "followers": "317.4K",
  "userTotalLikes": "4.5M",
  "userDescription": "Seja bem vindo(a\nAo mundo mágico das Calopsitas\nVe...
  "userShareLinks": [
    "bit.ly/Calopsita_mansa"
  ],
  "userImageUrl": "https://p77-sign-va.tiktokcdn.com/musically-maliva-obj...
  "userName": "calopsitas_mansa",
  "userNickname": "calopsitas_mansa",
  "uploadDate": "2020-11-3",
  "caption": "#cockatiels ",
  "hashtags": [
    {
      "hashtag": "cockatiels ",
      "url": "https://www.tiktok.com/tag/cockatiels?lang=en"
    },
    {
      "hashtag": "cockatiel ",
      "url": "https://www.tiktok.com/tag/cockatiel?lang=en"
    },
    {
      "hashtag": "ave ",
      "url": "https://www.tiktok.com/tag/ave?lang=en"
    },
    {
      "hashtag": "bird ",
      "url": "https://www.tiktok.com/tag/bird?lang=en"
    },
    {
      "hashtag": "fy ",
      "url": "https://www.tiktok.com/tag/fy?lang=en"
    },
    {
      "hashtag": "calopsite ",
      "url": "https://www.tiktok.com/tag/calopsite?lang=en"
    },
    {
      "hashtag": "calopsita ",
      "url": "https://www.tiktok.com/tag/calopsita?lang=en"
    },
    {
      "hashtag": "birds ",
      "url": "https://www.tiktok.com/tag/birds?lang=en"
    },
    {
      "hashtag": "🐦 ",
      "url": "https://www.tiktok.com/tag/%F0%9F%90%A6?lang=en"
    },
    {
      "hashtag": "fyy",
      "url": "https://www.tiktok.com/tag/fyy?lang=en"
    }
  ],
  "music": "som original - calopsitas_mansa",
  "videoUrl1": "https://www.tiktok.com/@calopsitas_mansa/video/6890903737309728001",
  "videoId": "6890903737309728001",
  "userId": "6807203737644860422",
  "videoUrl2": "https://v16-web.tiktok.com/video/tos/alisg/tos-alisg-pve-0037c001/...
  "likes": "374K",
  "comments": "3467",
  "shares": "13.1K",
  "scrapedAt": "2021-09-15T09:22:30.697Z"
}
```

### Epilogue
Thank you for trying first version of this actor.
I will be very glad for a feedback that you can send to my email `marketa@apify.com`.
If you find any bug, please create an issue on the [Github page](https://github.com/sauermar/Tiktok-Scraper/issues).

