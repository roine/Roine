---
path: /create-type-from-object
title: Typescript - Create type definition from object
date: '2020-02-06T00:26:47.246Z'
tags: [til, typescript]
---
You can generate a type from an object

```typescript
// base file file.ts
const myObj = {a: 1, b: 2}
```
in the shell
```shell
tsc --declaration file.ts
```
it'll generate two files, the compile js file and the type declaration file.
```typescript
/// type declaration file file.d.ts
declare const myObj: {
    a: number;
    b: number;
};
```
The JS file can be ignored

