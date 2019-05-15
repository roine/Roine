---
path: /colours-for-makefile
title: Colours for Makefile
date: '2019-05-15T07:24:02.008Z'
tags: [til, makefile, ansi]
---
I've added colours to Makefiles few times in the past. Each and every single time I have spent way too much time figuring out the code for the colours. So here it is, my most used colours in one place:
```makefile
COLOUR_GREEN=\033[0;32m
COLOUR_RED=\033[0;31m
COLOUR_BLUE=\033[0;34m
COLOUR_END=\033[0m
```
Usage:
```makefile
@echo "$(COLOUR_GREEN)Test Passed$(COLOUR_END)"
```
[More info on stackoverflow](https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux/20983251).