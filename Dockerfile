# Use an official Node.js runtime as a base image
FROM node:20-alpine3.18

# Set the working directory inside the container
WORKDIR /nmthuann/src/user-service

# Copy package.json and yarn.lock to the working directory
COPY ./*.json yarn.lock ./

# Install the application dependencies using Yarn => tải node_modules
# COPY ./node_modules
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Expose a port (assuming your app is running on port 3000)
EXPOSE 3334

# Command to run the application
CMD ["yarn", "start"]
