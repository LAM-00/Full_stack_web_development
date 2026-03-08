# ----------- 
# Dockerfile (Assignment 3)
#  --------------

FROM node:latest


# The app runs on port 3000 inside the container 
EXPOSE 3000

WORKDIR /app

# Copy the files first 
COPY package*.json ./

# Copy the rest of the project
COPY . .

RUN npm install

CMD ["node", "server.js"]
