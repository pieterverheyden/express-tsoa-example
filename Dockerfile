FROM node:14.17.3 as build

RUN mkdir -p /app
WORKDIR /app

COPY . ./
RUN rm -rf dist
RUN rm -rf node_modules
RUN rm -rf src/generated
RUN npm install
RUN npm run build

FROM node:14.17.3-alpine3.11

COPY --from=build /app /app
WORKDIR /app

ENV NODE_ENV production

CMD ["node", "dist/index.js"]