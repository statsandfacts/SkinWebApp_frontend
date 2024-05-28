# Stage 1: Build the Next.js application
FROM node:20 AS builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Setup NGINX with SSL and serve the Next.js application
FROM nginx:alpine

# Copy NGINX configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Create directory for SSL certificates
RUN mkdir -p /etc/nginx/ssl

# Copy SSL certificates
COPY ssl/9a07b3ec74f104e1.crt /etc/nginx/ssl/9a07b3ec74f104e1.crt
COPY ssl/private_key.key /etc/nginx/ssl/generated-private-key.txt

# Remove default NGINX website
RUN rm -rf /usr/share/nginx/html/*

# Copy the built Next.js application to NGINX
COPY --from=builder /usr/src/app/.next /usr/share/nginx/html

# Expose ports
EXPOSE 80
EXPOSE 443

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
