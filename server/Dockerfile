FROM node:16-alpine AS build-env

RUN mkdir -p /home/node/code
RUN chown node /home/node/code

USER node

WORKDIR /home/node/code

COPY --chown=node:node package.json yarn.lock ./

RUN yarn install

COPY --chown=node:node . .

RUN yarn next build

RUN npm prune --production

FROM node:16-alpine

WORKDIR /app

COPY --from=build-env /home/node/code/package.json ./package.json
COPY --from=build-env /home/node/code/node_modules ./node_modules
COPY --from=build-env /home/node/code/.next ./.next

CMD ["yarn", "next", "start", "-p", "3031"]