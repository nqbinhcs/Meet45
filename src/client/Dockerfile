FROM node:18.12.1

WORKDIR /app

COPY package.json .

RUN export NODE_OPTIONS=--openssl-legacy-provider

RUN npm install --force

COPY . .

EXPOSE 3000

CMD ["npm", "start"]