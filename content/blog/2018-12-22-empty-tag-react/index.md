---
path: empty-tag-react
title: Empty Tag in React
date: '2018-12-22T16:57:37.121Z'
tags: [react, til]
---
When you need to return more than one element you have few solutions.
## Wrap with an element
```html
<div>
  <span>1</span>
  <span>2</span>
</div>
```
## Return a list (requires a key)
```javascript
function List() {
    return [<span key='1'>1</span>, <span key='2'>2</span>]
}
```
## Use Fragment (16.2.0+)
```html
<Fragment>
  <span>1</span>
  <span>2</span>
</Fragment>
```
## Use empty tag (some kind of alias for Fragment)
```html
<>
  <span>1</span>
  <span>2</span>
</>
```
