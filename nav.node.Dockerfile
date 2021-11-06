FROM node:14.17

WORKDIR /app
COPY . /app


RUN npm i

RUN npm run build-prod 


CMD npm run serve