# Timer for Websites That Steal Your Time

This project helps to control time was spent on sites. It requires special extension for Chrome browser.

# Installing

Install extension for Chrome browser [Custom JavaScript for websites](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija).

Open configuration of [cjs](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija) browser extension on the site you want to control. Click on the link "your own external scripts", add path link [https://cdn.rawgit.com/ivan-shishkov/34_timemachine/bfd5397c/index.js](https://cdn.rawgit.com/ivan-shishkov/34_timemachine/bfd5397c/index.js). Don`t forget to press "enable cjs for this host" to enable custom JS and then click the 'Save' button.

After that, the timer will be displayed in the top left corner of the browser window and will count down 3 minutes. And then, messages that motivate the work to continue will be displayed once every 30 seconds.

For faster development you can use JS code hosted on localhost. Simple web server can be used for that, run:

```bash

python3 -m http.server
```

Add path `http://localhost:8000/index.js` to [cjs](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija) browser extension. Done.


# Project Goals

The code is written for educational purposes. Training course for web-developers - [DEVMAN.org](https://devman.org)
