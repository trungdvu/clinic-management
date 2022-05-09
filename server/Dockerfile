FROM node:16-alpine

WORKDIR usr/src/app

COPY package.json ./
RUN npm install

COPY tsconfig.json ./

COPY src ./src

COPY .env ./

EXPOSE 5000

CMD ["npm", "run", "dev"]