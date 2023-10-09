# Use an official Node.js runtime as the base image
FROM node:17-alpine

# Set the working directory in the container
WORKDIR /taskforce_backend

# Copy your application files to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Specify the command to run when the container starts
CMD ["npm", "run", "dev"]
