FROM node:14.17

WORKDIR /app
COPY . /app


RUN npm i

CMD npm run start