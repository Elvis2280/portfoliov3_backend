# Use an official Node.js runtime as the base image
FROM node:16.13

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json into the Docker container
COPY package*.json ./

# Install the application dependencies inside the Docker container
RUN npm install

# Copy the rest of the application into the Docker container
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose port 8080 to the outside world
EXPOSE 8080

# Start the application
CMD [ "npm", "run", "dev" ]