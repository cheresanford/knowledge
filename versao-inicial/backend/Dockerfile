# Use node:12-alpine as the base image
FROM node:12-alpine

# Install necessary build dependencies for PostgreSQL
# RUN apk add --no-cache postgresql-client

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the container
COPY knowledge/versao-inicial/backend/package*.json ./

# Install dependencies defined in package.json

# If you want to use nodemon globally, install it
RUN npm install -g nodemon
RUN npm install -g knex
RUN npm install pg --save
RUN npm install

# If you want to use nodemon for development, install it as a dev dependency
# It's better to install it as a dev dependency in your package.json, but you can also install it here
# RUN npm install --save-dev nodemon

# Copy the rest of your application code to the container
# COPY . .
COPY knowledge/versao-inicial/backend/ ./
# Expose the port your app runs on
EXPOSE 3000

# Command to run your app
#CMD ["npm", "start"]
CMD ["npm", "start"]
#CMD ["node", "index.js"]
