---
path: /bypass-cors-rules-with-a-proxy-server
title: Bypass cors rules with a proxy server
date: '2019-05-15T03:37:05.514Z'
tags: [til, cors]
---
Cors can be a pain as a frontend developer. Maybe you're on a localhost and want to access the prod API.
The problem is that the prod server enforce same origin request. There are few ways around it, my favourite so far is using a proxy server. Let's see how CORS work and then how the proxy server solves it.

Imagine we are building an application on `localhost` and need to access the API in production `test.com`. We work on some data updating and need to make a `POST` request, wee write our query and try it. The browser detects that the requested resource is on an other domain than the requester. So before to run our POST request, it runs a preflight request (OPTION) to ask whether the server accepts requests from other origin. If the server says no the `POST` is not executed. At the moment only browsers enforce CORS rules. What if we could have a server that accepts request from any domain, take a URL and make an http request for us.

##TL;DR
Enter [`cors-anywhere`](https://cors-anywhere.herokuapp.com). With it you could query your `test.com` API like so `https://cors-anywhere.herokuapp.com/https://test.com/api/login`. No more preflight denying you access. Pretty awesome.

##Extra
You might not want to add this everywhere.
```javascript
if(isProd) {
    const domain =  "/api"
}
else {
    const domain =  "https://cors-anywhere.herokuapp.com/https://test.com/api"
}
fetch(domain + "/login")
```