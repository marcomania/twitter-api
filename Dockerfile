FROM node:19.7-alpine3.16 as base
RUN apk update && apk add --no-cache dumb-init
WORKDIR /usr/src/app
COPY package*.json ./

FROM base as dev
RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm install
COPY . .
CMD ["dumb-init", "node", "server-dev.js"]

FROM base as production
ENV NODE_ENV production
RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm ci --only=production
USER node
COPY --chown=node:node ./src/ .
EXPOSE 3000
CMD ["dumb-init", "node", "server.js"]