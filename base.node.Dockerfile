FROM node:latest

WORKDIR /app
COPY . /app



ENV NODE_ENV=docker_dev

RUN npm i

CMD npm run start