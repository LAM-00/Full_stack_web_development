# Build stage
FROM node:20 AS build

WORKDIR /usr/src/app

# Copy package.json first for caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build production bundle
RUN npm run build

# Serve stage
FROM node:20

WORKDIR /usr/src/app

# Install a lightweight static server
RUN npm install -g serve

# Copy build output from previous stage
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 5173

# Serve the production build
CMD ["serve", "-s", "dist", "-l", "5173"]
