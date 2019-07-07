FROM node:8.16

RUN mkdir /jetter-client

WORKDIR /jetter-client

COPY . /jetter-client

RUN npm install

CMD ["npm", "run", "dev"]