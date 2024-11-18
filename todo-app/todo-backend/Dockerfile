FROM node:20 AS build

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

USER node

CMD npm start