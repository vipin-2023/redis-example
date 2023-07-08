# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Copy app source code
COPY . .

# Install dependencies
RUN npm ci

# Expose the port on which the app will run
EXPOSE 3000

# Transpile TypeScript to JavaScript
RUN npm run build 

# Start the application
CMD ["npm", "start"]


# Use the official Redis base image
FROM redis

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the custom Redis configuration file to the container
COPY redis.conf /usr/local/etc/redis/redis.conf

# Expose the Redis port
EXPOSE 6379

# Run Redis with the custom configuration file
CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]

