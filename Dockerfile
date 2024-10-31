# Use Node.js as the base image
FROM node:18.15.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json npm.lock ./

# Install dependencies
RUN npm install --frozen-lockfile

# Install dependencies
RUN npm install

# Copy the app's source code to the container
COPY . .

# Build the React app
RUN npm build

# Serve the build
CMD ["npx", "serve", "-s", "build"]

