## Dockerfile

FROM node:latest

EXPOSE 3000

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

CMD ["node", "server.js"]
