---
path: /how-to-prettify-a-json-object-using-the-osx-shell
title: How to prettify a JSON object using the OSX shell
date: '2019-08-29T04:54:23.855Z'
tags: [osx, shell, til, JSON, format]
---
I often need to prettify a JSON and always end up googling `json format online`, pasting my JSON and copying the result. With the following alias I can just copy my JSON, type `jsonformat` in the shell and magic the formatted JSON is in my clipboard.

```shell
alias jsonformat="pbpaste | python -m json.tool | pbcopy"
```