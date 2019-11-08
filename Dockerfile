FROM node:8.16

RUN apt-get update -qq && apt-get install -y bash curl openssh=7.6 python

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN mkdir /jetter-client

WORKDIR /jetter-client

COPY . /jetter-client

RUN npm install

CMD ["npm", "run", "dev"]