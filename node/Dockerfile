FROM node as base

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env ./
COPY babel.config.js ./
COPY tsconfig.json ./
COPY ./src ./src
COPY ormconfig.docker.json ./ormconfig.json

RUN npm install

FROM base as production

RUN apt-get update && apt-get install -y wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN npm run build

COPY ./.env ./dist/
COPY keycloak.docker.json ./dist/keycloak.json
COPY ormconfig.docker.json ./dist/ormconfig.json

EXPOSE 3333

WORKDIR /usr/src/app/dist

# CMD ["node", "./shared/infra/http/server.js"]
