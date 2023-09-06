FROM node:alpine

ENV NODE_ENV=production

WORKDIR /app

# Add package.json and package-lock.json to the container
ADD package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Add the rest of the files
ADD bin ./bin
ADD src ./src

# Run the app
CMD ["npm", "start"]
