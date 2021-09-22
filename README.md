## Features
Our free TikTok Scraper lets you extract data about videos from the [TikTok](https://www.tiktok.com/) social media site. It scrapes the first page of results from TikTok hashtag search and gives you detailed TikTok information in structured formats such as Excel, XML, JSON, and CSV that you can use in your own reports, spreadsheets, and applications.

## Why use TikTok Scraper?
TikTok Scraper creates an unofficial TikTok API. TikTok now has an [estimated one billion users](https://wallaroomedia.com/blog/social-media/tiktok-statistics/) and many of those users spend as much as 80 minutes per day on the app.

With a TikTok API, you can build your own products and applications on top of the TikTok platform.

TikTok Scraper currently only scrapes information based on hashtags, but we will be adding more functionality, so please [contact us](mailto:support@apify.com) if you want to suggest anything!

## Cost of usage
If you run TikTok Scraper on the Apify platform, a single run of the actor will usually cost approximately $0.08 and you'll get about 36 results. On average, you can extract about 1,000 results for less than $2.50.

The best way to find out how many platform credits an actor will consume is to perform a test run. You can then review platform usage in Billing and figure out the best Apify subscription plan for your needs.

## Output
The output from TikTok Scraper is stored in a dataset. Each item is information about a video and user or channel. Here's an example of some of the output you would get if you scraped the hashtag "cockatiel":

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

## Limitations
TikTok Scraper currently only scrapes the first page of results for TikTok hashtag search, so you will usually get a maximum of 36 results per hashtag. You can scrape more than one hashtag, but each will still return a maximum of 36 results.

## Personal data
You should be aware that your results might contain personal data. Personal data is protected by GDPR in the European Union and by other regulations around the world. You should not scrape personal data unless you have a legitimate reason to do so. If you're unsure whether your reason is legitimate, consult your lawyers. You can also read our blog post on the [legality of web scraping](https://blog.apify.com/is-web-scraping-legal/).
