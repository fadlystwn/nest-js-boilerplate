# Use an official Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Default command to run the app
CMD ["npm", "run", "start"]
