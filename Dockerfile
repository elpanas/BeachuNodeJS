FROM node:14-alpine
ENV NODE_ENV=production\ 
MONGO_USER=admin \
MONGO_PASSWORD=admin \
MONGO_HOST="192.168.0.3" \
MONGO_PORT1=40001 \
MONGO_PORT2=40002 \
MONGO_PORT3=40003 \
WEB_SERVICE_PORT=3000
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
RUN chown -R node /usr/src/app
USER node
CMD ["node", "server.js"]
