## Features
Our free TikTok Scraper lets you extract data about videos from the [TikTok](https://www.tiktok.com/) social media site. It scrapes results from TikTok hashtag search, TikTok user profile or post and gives you detailed TikTok information in structured formats such as Excel, XML, JSON, and CSV that you can use in your own reports, spreadsheets, and applications.

## Why use TikTok Scraper?
TikTok Scraper creates an unofficial TikTok API. TikTok now has an [estimated one billion users](https://wallaroomedia.com/blog/social-media/tiktok-statistics/) and many of those users spend as much as 80 minutes per day on the app.

With a TikTok API, you can build your own products and applications on top of the TikTok platform.

TikTok Scraper currently only scrapes information based on hashtags, user profiles or posts, but we will be adding more functionality, so please [contact us](mailto:support@apify.com) if you want to suggest anything!

## Cost of usage
**To be recalculated**

If you run TikTok Scraper on the Apify platform, a single run of the actor will usually cost approximately $0.08 and you'll get about 36 results. On average, you can extract about 1,000 results for less than $2.50.

The best way to find out how many platform credits an actor will consume is to perform a test run. You can then review platform usage in Billing and figure out the best Apify subscription plan for your needs.

## Output
The output from TikTok Scraper is stored in a dataset. Each item is information about a video and user or channel. Here's an example of some of the output you would get if you scraped the hashtag "comfortfood":

```
{
  "id": "6905590108888747269",
  "text": "I tried different pickles and it worked! #friedpickles #keto #omad #ketosnack #crunchsounds #asmr #ComfortFood",
  "createTime": 1607833011,
  "authorMeta": {
    "id": "6774507247595815941",
    "name": "lowcarblove",
    "nickName": "Mayra Wendolyne",
    "verified": false,
    "signature": "Hi I’m Mayra!❤️\nYouTube & IG: lowcarblove\nMy faves👇 Discount code: lowcarblove",
    "avatar": "https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1656730121318405~c5_720x720...",
    "following": 196,
    "fans": 942500,
    "heart": 9600000,
    "video": 715,
    "digg": 3466
  },
  "musicMeta": {
    "musicName": "original sound",
    "musicAuthor": "Mayra Wendolyne",
    "musicOriginal": true,
    "musicAlbum": "",
    "playUrl": "https://sf16-ies-music-va.tiktokcdn.com/obj/musically-maliva-obj/6905589921495452422.mp3"
  },
  "webVideoUrl": "https://www.tiktok.com/@lowcarblove/video/6905590108888747269",
  "videoUrl": "https://v16-web.tiktok.com/video/tos/useast2a/tos-useast2a-pve-0068/b9def91b70bd4bb997d6e13c...",
  "videoMeta": {
    "height": 1024,
    "width": 576,
    "duration": 36
  },
  "diggCount": 644500,
  "shareCount": 88200,
  "playCount": 6000000,
  "commentCount": 5216,
  "downloaded": false,
  "mentions": [],
  "hashtags": [
    {
      "id": "223064",
      "name": "friedpickles",
      "title": "",
      "cover": ""
    },
    {
      "id": "8289028",
      "name": "keto",
      "title": "",
      "cover": ""
    },
    {
      "id": "28977063",
      "name": "omad",
      "title": "",
      "cover": ""
    },
    {
      "id": "1623147616577542",
      "name": "ketosnack",
      "title": "",
      "cover": ""
    },
    {
      "id": "49546115",
      "name": "crunchsounds",
      "title": "",
      "cover": ""
    },
    {
      "id": "1248236",
      "name": "asmr",
      "title": "Create &amp; enjoy the most satisfying sounds (ASMR) while cooking, applying your beauty routine, creating art, or any of your other hobbies!🤩",
      "cover": "https://p16-amd-va.tiktokcdn.com/obj/musically-maliva-obj/99cb203b5d6c61ac91707cb06ecd8a61"
    },
    {
      "id": "563964",
      "name": "comfortfood",
      "title": "From recipes to wind down a busy day or a food spot you visit when you're feeling down, we'd love to hear your food story and your #comfortfood experiences. Check out some of the best food stories and recipes here. 🥘",
      "cover": ""
    }
  ]
}
```

## Limitations
TikTok Scraper scrapes custom number of results from every hashtag search or user profile, which is defined by 'resultsPerPage' parameter from input.

## Personal data
You should be aware that your results might contain personal data. Personal data is protected by GDPR in the European Union and by other regulations around the world. You should not scrape personal data unless you have a legitimate reason to do so. If you're unsure whether your reason is legitimate, consult your lawyers. You can also read our blog post on the [legality of web scraping](https://blog.apify.com/is-web-scraping-legal/).
