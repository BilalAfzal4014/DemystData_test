# ******** DEVELOPMENT ********
FROM node:19 AS development

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build
