# Build
FROM node:14-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .
COPY package-lock.json .
RUN npm install --silent
RUN npm install react-scripts@4.0.1 -g --silent
COPY . .

CMD ["npm", "start"]
