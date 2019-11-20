FROM node:13.1

RUN apt-get update -qq && apt-get install -y bash curl openssh-server python3

COPY . /jetter-client

WORKDIR /jetter-client

RUN npm install

RUN npm run build

CMD ["npm", "start"]
