FROM node:20-slim

WORKDIR /usr/compras-app/app

RUN apt-get update && apt-get install -y \
    git \
    python3 \
    make \
    g++ \
    && apt-get clean

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3005