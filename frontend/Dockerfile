
FROM node:alpine



WORKDIR /app

# add package.json and package-lock.json to the container
ADD package.json package-lock.json ./

# Install dependencies
RUN npm install

# Add the rest of the files
ADD .eslintrc.cjs /app/.eslintrc.cjs
ADD .prettierrc.json /app/.prettierrc.json
ADD index.html /app/index.html
ADD vite.config.js /app/vite.config.js
ADD vitest.config.js /app/vitest.config.js

# Run the app
CMD [ "npm", "run", "dev" ]
