FROM node:latest

# Create app directory inside container
WORKDIR /app

# Copy dependency definitions first
COPY package*.json ./

# Install dependencies inside the image
RUN npm install

# Copy application code
COPY server.js .

# Document container port
EXPOSE 3002

# Start with shell (lecture choice)
CMD ["node", "server.js"]
# CMD ["/bin/bash"]
