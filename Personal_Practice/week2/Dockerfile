
## sequecing matters

FROM node:latest
## predictable filesystem
WORKDIR /app


# enables Docker layer caching
COPY package*.json ./
# installs Express once
RUN npm install


# app code
COPY server.js .

EXPOSE 3002

# Compose-style interactive
# CMD ["/bin/bash"]
CMD ["node","server.js"]