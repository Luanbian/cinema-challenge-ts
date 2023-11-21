ARG NODE_VERSION=18.12.1

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV development

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npx prisma generate

CMD npm run load-env-test -- npx prisma migrate deploy && npm run start

EXPOSE 8080