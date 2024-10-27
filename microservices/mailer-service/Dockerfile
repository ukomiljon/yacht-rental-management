# development stage
FROM node:18-alpine AS development

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# production stage
FROM node:18-alpine AS production

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=prod

# Copy built files from the development stage
COPY --from=development /usr/src/app/dist ./dist

# Start the application
CMD ["node", "./dist/main.js"]
