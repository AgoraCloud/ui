<p align="center">
  <img src="https://user-images.githubusercontent.com/35788699/124201339-cab12c80-daa5-11eb-9e76-99ed1a626529.png" alt="Logo Cropped" width="256" height="256">
</p>
<p align="center">
  <a href="https://github.com/AgoraCloud/ui/issues"><img src="https://img.shields.io/github/issues/AgoraCloud/ui" alt="GitHub issues"></a> <a href="https://github.com/AgoraCloud/ui/blob/main/LICENSE"><img src="https://img.shields.io/github/license/AgoraCloud/ui" alt="GitHub license"></a> <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/AgoraCloud/ui"> <img src="https://img.shields.io/github/release-date/AgoraCloud/ui" alt="GitHub Release Date"> <img alt="Docker Pulls" src="https://img.shields.io/docker/pulls/agoracloud/ui"> <img src="https://img.shields.io/github/workflow/status/AgoraCloud/ui/main_versioned_push" alt="GitHub Workflow Status"> <img src="https://img.shields.io/github/contributors/AgoraCloud/ui" alt="GitHub contributors"> <img src="https://img.shields.io/github/commit-activity/m/AgoraCloud/ui" alt="GitHub commit activity">
</p>

AgoraCloud is an open source and self hosted cloud development platform that runs in Kubernetes.

## Requirements

node version > 10

## Install

```
npm i
```

## Run Locally

- insure that no other app is using port 3000

```
npm run start
```

## Build

```
npm run build
```

# Dev Server

insure docker and docker-compose are installed

fill in the values in accordance with dev/docker-compose.yml

```
cd ./dev/ docker-compose up -d

## Proxy
```

    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
        "logLevel": "info",
      },
      '/proxy': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
        "logLevel": "debug",
      }
    },
    proxy: {
      '/api': {
        target: 'https://agoracloud.civo.saidghamra.com',
        changeOrigin: true,
        secure: false,
        ws: true,
        "logLevel": "info",
      },
      '/proxy': {
        target: 'https://agoracloud.civo.saidghamra.com',
        changeOrigin: true,
        secure: false,
        ws: true,
        "logLevel": "debug",
      }
    },

```

```

## Update Dev Server

```
docker system prune -a
```

## Remove Volumes

incase you need to remove your account

```
docker-compose down
docker volume prune
```

# Testing

## Verify User

```
sudo docker exec -it <container_name> sh

use test

db.tokens.insertOne({"type": "VERIFY_ACCOUNT", "user": ObjectId(<USER ID>), "expiresAt": new Date("2021-01-31T20:47:03.468Z")})
```
