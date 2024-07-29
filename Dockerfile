FROM node:20.16.0
WORKDIR /
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm","run","start"]
