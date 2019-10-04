---
path: /find-all-the-tickets-worked-on-between-two-commits
title: Find all the tickets worked on between two commits
date: '2019-10-04T05:29:03.519Z'
tags: [til]
---
Find all the ticket starting by DPO between two commit, it relies on the fact that commits are squashed and the merge message contains the branch name.
```
git log --oneline 653d7e09d49..master --abbrev-commit | grep -E "DPO-\d+" -o
```