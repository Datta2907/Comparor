FROM node:18

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run dev

EXPOSE 3000

CMD ["npm", "start"]