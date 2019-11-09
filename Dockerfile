FROM node:13.1

RUN apt-get update -qq && apt-get install -y bash curl openssh-server python3

COPY . /jetter-client

ADD .profile.d /app/.profile.d

RUN chmod 777 /app/.profile.d/heroku-exec.sh

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

WORKDIR /jetter-client

RUN npm install

RUN npm run build

CMD ["npm", "start"]
