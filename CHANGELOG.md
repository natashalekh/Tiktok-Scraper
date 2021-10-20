## 2021-10-20
*Fixes*
- when `page.waitingForResponse` timeouts, it retires the session and restarts browser. This should prevent
looping of timeouts on request retries

*Features*
- TikTok sometimes sends a request for the same data two times. This behavior won't affect total number of
  outputted data, specified on input. (Also duplicity videos for a hashtag/profile searches will
  be scraped only once, but won't be counted into the number of
  outputted data for the specific search)
- Sometimes there are more than 6 videos loaded on the search page. The scraper won't push them into the
  outputted results, so that the number of results remains consistent according to the specification on
  input.
## 2021-10-18
*Fixes*
- computation of `outputLength` is no longer dependent on persisted progress,
  meaning scraping of more than one hashtag/profile is now working properly
## 2021-10-15
*Fixes*
- `handlePageFunction` does not timeout when `resultsPerPage` are set low
## 2021-10-14
*Features*
- New output structure
- Added the possibility to scrape more than the first page of results (regulated by `resultsPerPage` input)
- Scrapes user profiles defined on input by username in `profiles`
- Added optional attributes `maxConcurrency`, `maxRequestRetries` and `resultsPerPage` to input
- If `resultsPerPage` is not specified, it defaults to 10 and minimal value is 1
