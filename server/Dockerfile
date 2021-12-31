FROM node:16-alpine

RUN mkdir -p /home/node/code
RUN chown node /home/node/code

USER node

WORKDIR /home/node/code

COPY --chown=node:node . .

RUN pwd
RUN ls -lah
RUN mkdir -p /home/node/code/node_modules
RUN ls -lah
RUN yarn install


CMD ["yarn", "start"]