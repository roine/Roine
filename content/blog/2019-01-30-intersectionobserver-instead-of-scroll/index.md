---
path: /intersectionobserver-instead-of-scroll
title: IntersectionObserver instead of scroll
date: '2019-01-30T00:39:46.774Z'
tags: [javascript, events, til]
---
If you want to do something when the viewport reaches a certain element in the view, you would use a scroll event and 
check that the position of that element is equal to the viewport top position.

You can instead use the [IntersectionObserver][]. You choose a root and target and when they cross path it calls the callback
, when root is null then it uses the browser viewport.
```javascript
const options = {
  root: null, // use browser viewport
  rootMargin: '0px',
  treshold: 0.0
}
const observer = new IntersectionObserver(callback, options)
const target = document.querySelectorAll('#item')
observer.observe(target)
```
[Demo in codepen][].

[IntersectionObserver]: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
[Demo in codepen]: https://codepen.io/roine/full/RvowQb