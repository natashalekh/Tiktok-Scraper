## 2021-10-14
*Features*
- New output structure
- Added the possibility to scrape more than the first page of results (regulated by `resultsPerPage` input)
- Scrapes user profiles defined on input by username in `profiles`
- Added optional attributes `maxConcurrency`, `maxRequestRetries` and `resultsPerPage` to input
- If `resultsPerPage` is not specified, it defaults to 10 and minimal value is 1
