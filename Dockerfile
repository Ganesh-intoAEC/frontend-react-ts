# Stage 1: Build the application
FROM node:18-alpine AS build

WORKDIR /usr/app

# Copy only package files to take advantage of caching
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application files
COPY . .

# Build the app (adjust this command based on your project)
RUN npm run build

# Stage 2: Create a smaller image
FROM node:18-alpine

WORKDIR /usr/app

# Copy only the built files and production dependencies from the previous stage
COPY --from=build /usr/app/package.json ./package.json
COPY --from=build /usr/app/node_modules ./node_modules
COPY --from=build /usr/app/.next ./.next
COPY --from=build /usr/app/public ./public

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
USER node

# Launch app with PM2
CMD [ "pm2-runtime", "start", "npm", "--", "start" ]