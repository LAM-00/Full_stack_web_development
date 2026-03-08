FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Compile TypeScript to JavaScript
RUN npx tsc 

# Run compiled JS, not TS 
CMD ["node", "dist/server.js"]
