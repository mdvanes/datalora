FROM node:16-alpine

USER node

WORKDIR /home/node/code

COPY --chown=node:node . .

RUN yarn install

CMD ["yarn", "start"]