# -------- Build Stage --------
FROM node:20 AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build


# -------- Production Stage --------
FROM node:20

WORKDIR /usr/src/app

RUN npm install -g serve

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 80

CMD ["serve", "-s", "dist", "-l", "80"]