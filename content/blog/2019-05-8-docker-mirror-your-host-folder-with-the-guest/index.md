---
path: /docker-mirror-your-host-folder-with-the-guest
title: Docker Mirror your host folder with the guest
date: '2019-05-08T08:24:06.582Z'
tags: [docker, til, container]
---
To mount a volume that mirrors your files in your host
```bash
docker run -p 8080:3000 -v $(pwd):/var/www -w "/var/www" node npm start
```
- `8080:3000` your app runs in port 3000 and you want it to be served in 8080 in the host, this will forward the port.
- `-v $(pwd):/var/www`, mounts the current directory /var/www
- `-w "/var/www"` sets the working directory inside the container to /var/www, so when when we execute our command it'll execute their
- `node` name of the image
- `npm start` our command to be executed in the working directory

So it starts the node container, exposes 8080 and forward 3000 to it. Mount a volume to mirror our local files, sets the working directory where the command will be executed. Finally, execute the command.
