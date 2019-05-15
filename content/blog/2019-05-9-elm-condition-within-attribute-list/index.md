---
path: /elm-condition-within-attribute-list
title: Elm condition within attribute list
date: '2019-05-09T11:42:37.158Z'
tags: [til, elm]
---
Today I was reviewing some ELM code and noticed a nice simple trick that is going to change my life! It has to do with conditional `Html.Attributes`. Let's start by how I was doing my conditional Attributes:
```elm
[class "hello"] ++ (if bool then [onClick msg] else [])
```
Pretty ugly, right? Now imagine that I have more than one conditional Attribute.

Enter the empty Attribute.
```elm
empty = 
    Html.Attributes.class ""
```
This blew my mind, how did I never thought of that? It's so simple and elegant. The code above would then write:
```elm
[class "hello", if bool then onClick msg else empty]
```