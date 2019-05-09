---
path: /get-the-ip-of-a-docker-image
title: Get the ip of a docker image
date: '2019-05-08T08:22:48.798Z'
tags: [til, docker, ip, container]
---
If you need the container's IP
```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_id
```
Replace `container_id` by yours.