FROM node:alpine

WORKDIR /app

# install nodemon as a global package
RUN npm install -g nodemon

# add package.json and package-lock.json to the container
ADD package.json package-lock.json ./
# Install dependencies
RUN npm install

# Add the rest of the files
ADD bin ./bin
ADD src ./src

# Run the app
CMD [ "nodemon" ]
