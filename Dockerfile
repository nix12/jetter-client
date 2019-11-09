FROM node:13.1

RUN apt-get update -qq && apt-get install -y bash curl openssh-server python3

COPY . /jetter-client

ADD .profile.d /app/.profile.d

RUN chmod +x /app/.profile.d/heroku-exec.sh

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

WORKDIR /jetter-client

RUN npm install

CMD ["npm", "run", "dev"]
