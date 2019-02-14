---
path: /pretty-print-json-in-file
title: Pretty print JSON in a file
date: '2019-02-14T01:14:46.823Z'
tags: [node-js, json]
---
If you try to dump an object in a JSON and for some reason want  it to be formatted use this snippet
```javascript
fs.writeFile('manifest.json', JSON.stringify(res, null, 4), 'utf8', (err) => {
  //...
})
```
This will add jump line and 4 space indentation after each entry