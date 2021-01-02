# Build
FROM node:14-alpine as build-step
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

# Install
FROM nginx:1.19.6-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
