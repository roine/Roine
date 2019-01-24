---
title: Reuse last argument from previous command
date: '2018-12-20T16:57:37.121Z'
tags: shell til
---
If you need to reuse the reuse the last argument from the previous command this is for you:
```shell
touch config.js
vi !$
```
Last command is equivalent to 
```shell
vi config.js
```
Bonus:
`echo $?` will display the exit code of therevious command
`!!` will re-execute the previous command, `sudo !!`