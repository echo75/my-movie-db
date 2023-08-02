# Base image
FROM node:alpine

# Working directory
WORKDIR /app

# Copy app to working directory
COPY . .

# Install dependencies
RUN npm install

# Default command
CMD ["npm", "start"]
