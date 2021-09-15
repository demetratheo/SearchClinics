FROM node:14-alpine

WORKDIR /api

COPY ./src/. .
COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn

CMD [ "node", "server.js" ]
