FROM node:alpine

ENV NODE_ENV=production

#WORKDIR /app
WORKDIR /var/www/html

# Add package.json and package-lock.json to the container
ADD package.json package-lock.json ./

# Install dependencies
RUN npm install --production
RUN npm audit fix --force

# Add the rest of the files
ADD bin ./bin
ADD src ./src

# Run the app
CMD ["npm", "start"]
