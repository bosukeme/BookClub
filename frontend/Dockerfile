FROM node:alpine

WORKDIR /app
COPY . .

RUN npm install
RUN npm install -g serve

CMD [ "serve", "-s", "build" ]