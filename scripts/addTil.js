const fs = require('fs');
const path = require('path');
const postRoot = path.join(process.env.ROOTDIR, 'content', 'blog')

function padLeft(width, paddingContent, text) {
    const newText = String(text);
    if (newText.length >= width) {
        return newText;
    } else {
        return Array.from(Array(width - newText.length)).map(_ => paddingContent).join('') + newText;
    }
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

const title = process.argv.slice(2).join(' ')
const prePostName = process.argv.slice(2).join('-').toLowerCase();
const now = new Date();
const datePostName = now.getFullYear() + "-" + (padLeft(2, "0", now.getMonth() + 1)) + "-" + now.getDate();
const postName = datePostName + '-' + prePostName
const postDir = path.join(postRoot, postName)
const frontMatter = `---
path: /${prePostName}
title: ${capitalize(title)}
date: '${now.toISOString()}'
tags: [til]
---`
fs.mkdirSync(path.join(postRoot, postName))
fs.writeFileSync(path.join(postRoot, postName, 'index.md'), frontMatter)
