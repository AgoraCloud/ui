# ui
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