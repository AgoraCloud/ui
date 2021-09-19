# BAIC-Flashboard: Frontend
![BAI Logo](https://baic-marketing.s3.amazonaws.com/logo.png)
![front end picture](../.imgs/frontend.png)
<!-- AND/OR PROJECT LOGO -->
<!-- AND/OR GIF/IMG DISPLAYING PROJECT -->

# Description
The frontend provides a user interface to select and CRUD some flashboard resources including 
### 1. renderer 
- visualization
- animation

### 2. datasource 
- DMP new logins
- TTCAnalyticsOvercrowding Green / Yellow / Red

### 3. Color Map
what colors the visualization is using

# Table of Contents
1. [Design Overview](#design-overview)
2. [Installation](#installation)
3. [Usage and Configuration](#usage-and-configuration)

# Design Overview
![frontend diagram](<../.imgs/frontend-diagram.png>)



# Installation
## System Requirements
- OS: ...
- RAM: ...
- Storage: ...
- Dependencies: ...
## Development Environment
### Developing on the PI
in order to develop on the pi, you must install 
- node 
- npm

The best way to develop on the PI is to use [VS Code Remote - SSH Extension](https://code.visualstudio.com/docs/remote/ssh-tutorial)

```bash
# install node
curl -sL https://deb.nodesource.com/setup_14.x -o setup_14.sh; sudo bash setup_14.sh

# install local dependencies (node_modules)
cd frontend
npm i
```

you can run the build commands on the PI, but I wouldn't recommend it because it runs very slow on the PI

## Production Environment

# Usage and Configuration
...