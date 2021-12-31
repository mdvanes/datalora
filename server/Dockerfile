FROM node:16-alpine

RUN mkdir -p /home/node/code
RUN chown node /home/node/code

USER node

WORKDIR /home/node/code

COPY --chown=node:node . .

RUN yarn install

CMD ["yarn", "start"]