# Use an official Node runtime as a parent image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Use an official Node runtime as a parent image for the production environment
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy the built Next.js application from the builder stage
COPY --from=builder /app ./

# Expose the port that the Next.js server will run on
EXPOSE 3000

# Set environment variable to production
ENV NODE_ENV production

# Start the Next.js application
CMD ["npm", "start"]
