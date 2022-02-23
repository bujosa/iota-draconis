FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

VOLUME /usr/src/app/src/logs

EXPOSE 4000

CMD ["npm", "start"]

