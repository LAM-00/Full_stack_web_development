FROM node:20

# Create app directory inside container
WORKDIR /usr/src/app

# Copy package.json + tsconfig first 
COPY package.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Expose backend port
EXPOSE 8080

# Start the server using ts-node
# CMD ["npx", "ts-node", "server.ts"]
CMD ["node", "--loader", "ts-node/esm", "src/server.ts"]
