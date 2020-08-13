---
path: /how-to-delete-remote-branches-that-have-been-merged-with-git
title: How to delete remote branches that have been merged with GIT
date: '2020-08-13T04:52:42.030Z'
tags: [til, git, git-branch, git-remote]
---

```bash
git branch -a --merged | \
grep -v master | \
grep -v develop | \
grep -v release | \
sed 's/remotes\/origin\//:/' | \
xargs -n 1 git push origin
```

This command will check all merged branch including remote ones. It'll then remove any vbranch containing master, develop or release. Strips out remotes/origin and pass it to git push origin.

Let's say, I created a branch that I called PFS-1, opened a PR and merged it, then the final command executed would be `git push origin :PFS-1`.
