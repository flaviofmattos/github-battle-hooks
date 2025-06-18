ARG NODE_VERSION=22.16.0

FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /app
COPY package*.json ./
COPY webpack.config.js ./
RUN npm install
COPY . .
RUN npm run build



FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html/
