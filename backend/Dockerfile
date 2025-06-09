FROM node:22-alpine

ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node","main.js"]