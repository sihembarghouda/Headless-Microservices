
FROM node:20-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild better-sqlite3

EXPOSE 1337

CMD ["npm", "run", "develop"]
