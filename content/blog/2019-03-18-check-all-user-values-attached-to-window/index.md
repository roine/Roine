---
path: /check-all-user-values-attached-to-window
title: Check all user values attached to window
date: '2019-03-17T22:33:28.625Z'
tags: [til, javascript]
---
Analyzing production is hard since it's most the time compressed and unreadable. One trick you can use is to check all the values attached to the window by the user. This snippet does exctly that, by comparing window to an iframe window:
```javascript
(function () {
    var results, currentWindow,
    // create an iframe and append to body to load a clean window object
    iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    // get the current list of properties on window
    currentWindow = Object.getOwnPropertyNames(window);
    // filter the list against the properties that exist in the clean window
    results = currentWindow.filter(function(prop) {
        return !iframe.contentWindow.hasOwnProperty(prop);
    });
    // log an array of properties that are different
    console.log(results);
    document.body.removeChild(iframe);
}());
```

__Source: https://stackoverflow.com/questions/17246309/get-all-user-defined-window-properties__