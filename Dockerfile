FROM node:16.14.0
WORKDIR /node_app


COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]