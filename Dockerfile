from node:18

WORKDIR /app

COPY package*.json ./
run npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]