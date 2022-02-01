## Features

Our free TikTok Scraper allows extracting data about videos from the  [TikTok](https://www.tiktok.com/)  social media site. It gives you detailed TikTok information in structured formats such as  _Excel, XML, HTML, JSON,_  and  _CSV_, which you can use in your own reports, spreadsheets, and applications. Our TikTok Scraper allows you to scrape:

- Results from TikTok  **hashtag search**.
- **Numbers**  of comments and shares, followers and following, total likes.
- **Individual posts** and **full user profiles**  - by using a URL for a specific profile or video.
- The output is limited to maximum **20 results** and **5 comments**. 

## Need more TikTok data? 

Use [TikTok Unlimited Scraper](https://apify.com/sauermar/tiktok-scraper) to use the full potential of scraping TikTok. Scrape TikTok hashtags, numbers of comments and shares, followers and following, user profiles, and individual posts without limitations.

## Why use TikTok Scraper?

This TikTok Scraper creates an unofficial TikTok API. TikTok now has an  [estimated one billion users](https://wallaroomedia.com/blog/social-media/tiktok-statistics/), and many of those users spend as much as 80 minutes per day on the app. With a TikTok API, you can build your own products and applications on top of the TikTok platform.


## Cost of usage

If you run TikTok Scraper on the Apify platform, a single run of the actor will take approximately 0.2 CU per 1000 results. It means that, on average, you can extract about  **1,000 results for less than 1 USD credit**.

The easiest way to know how many credits your actor will need is to perform a test run. If you're unsure how much credit you've got on your plan, check your limits in the  _Settings_  ->  _Usage and Billing_  tab in  [your Console](https://console.apify.com/).

## Tutorial

If you've never done scraping before - worry not; just follow our step-by-step guide on  [how to scrape TikTok](https://blog.apify.com/how-to-scrape-tiktok-tutorial/)  and you'll be up to speed in no time. Or simply follow our quick [video tutorial](https://www.youtube.com/watch?v=uZ0LYBCjvd4) on YouTube:

[![Watch the video here](https://img.youtube.com/vi/uZ0LYBCjvd4/0.jpg)](https://youtu.be/uZ0LYBCjvd4)


**How to use the extracted TikTok data:**

-   Boost **brand awareness**; spread the message about social issues and causes.
- **Forecast upcoming trends** and influences on social media across the new generation. 
- Get **data for research** and social listening experiments.
- Get authentic **product reviews**  and back up sentiment analysis with real data.
- **Plan commercial campaigns** on TikTok or other social media platforms.
- **Simplify market research** for hashtag challenges and marketing campaigns.


## Input parameters

If this actor is run on the  [Apify platform](https://console.apify.com/), our brand new interface will help you to configure all the necessary and optional parameters of this scraper before running it. This scraper recognizes the following input parameters:

-   **hashtags**  - scrapes TikTok for hashtags. You can duplicate this parameter to scrape several hashtags simultaneously.
-   **profiles**  - scrapes TikTok profiles. You can copy this parameter to scrape several profiles simultaneously.
-   **postURLs**- scrapes specific TikTok posts. You can duplicate this parameter to scrape several posts at the same time.
-   **resultsPerPage**  - sets the maximum limit for the amount of scraped results; default is 20. 
-   **maxRequestRetries**  - indicates the limit of scraper retries in case of any errors.
-   **proxyConfiguration**  - sets up the proxies.

### Example

```javascript
{  
    "resultsPerPage":  20,  
    "proxyConfiguration":  {  
        "useApifyProxy":  true  
    },  
    "hashtags":  ["comfortfood"],
    "maxRequestRetries":  10  
}

```

## Output

The output from TikTok Scraper is stored in a dataset. Each item is information about a video and user or channel. Here's an example of some of the output you would get if you used the input parameters above to scrape the hashtag "_comfortfood_":

### Example

```javascript
{
  "id": "6885142885939825925",
  "text": "Best Mashed Potatoes! #tiktokcooks #hellofall #comfortfood #homecooking #cookingwithshereen  #fyp",
  "createTime": 1603072290,
  "authorMeta": {
    "id": "6746332443361739782",
    "name": "cookingwithshereen",
    "nickName": "COOKING with SHEREEN",
    "verified": true,
    "signature": "YouTube & Insta ⤴️\n⬇️ My CookBook & Merch! ⬇️",
    "avatar": "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/750f43c1845b5a556207821b1a0d72c1~c5_720x720.jpeg?x-expires=1639000800&x-signature=gl7OpbhX1L9yhC6e2rm4rajLvZg%3D",
    "following": 27,
    "fans": 4400000,
    "heart": 72300000,
    "video": 185,
    "digg": 910
  },
  "musicMeta": {
    "musicName": "original sound",
    "musicAuthor": "COOKING with SHEREEN",
    "musicOriginal": true,
    "musicAlbum": "",
    "playUrl": "https://sf16-ies-music-va.tiktokcdn.com/obj/musically-maliva-obj/6885142857766669062.mp3"
  },
  "webVideoUrl": "https://www.tiktok.com/@cookingwithshereen/video/6885142885939825925",
  "videoUrl": "https://v16-web.tiktok.com/video/tos/useast2a/tos-useast2a-ve-0068c001/aaa32cd10cfc49d297adb7900f680551/?a=1988&br=3442&bt=1721&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&expire=1638937586&ft=wUyFfFGgkag3-I&l=202112072225270101890660492361F572&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&policy=3&qs=0&rc=Mzw2d2RobzZpeDMzNjczM0ApPDMzOzRpPDw6NzllNmlmNGdwLm9wZ2FyLzNfLS0vMTZzcy0yYy0xNDE1NDQvX2E2NGE6Yw%3D%3D&signature=30e50cb1af44c4eec84bca1b761180b9&tk=0&vl=&vr=",
  "videoMeta": {
    "height": 1024,
    "width": 576,
    "duration": 59
  },
  "diggCount": 3100000,
  "shareCount": 91600,
  "playCount": 21500000,
  "commentCount": 24900,
  "downloaded": false,
  "mentions": [],
  "hashtags": [
    { 

```

## Personal data

You should be aware that your results might contain personal data. Personal data is protected by GDPR in the European Union and other laws and regulations around the world. You should not scrape personal data unless you have a legitimate reason to do so. If you're unsure whether your reason is legitimate, consult your lawyers. You can read the basics of ethical web scraping in our blogpost on the  [legality of web scraping](https://blog.apify.com/is-web-scraping-legal/).

## Your feedback

Currently, TikTok Free Scraper scrapes information based on hashtags, user profiles, or posts. We will be adding more functionality soon, so feel free to  [contact us](mailto:support@apify.com)  for any suggestions or improvements.
