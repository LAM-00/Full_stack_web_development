
## sequecing matters

FROM node:18
## predictable filesystem
WORKDIR /usr/src/app


# enables Docker layer caching
COPY package*.json ./
# installs Express once
RUN npm install


# app code
COPY . .

EXPOSE 3000

# Compose-style interactive
# CMD ["/bin/bash"]
 CMD ["node","server.js"]