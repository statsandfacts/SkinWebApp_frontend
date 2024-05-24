# Use the official Node.js 20 image as a base
FROM node:20

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

#Use a lightweight web server to serve the static files
#FROM nginx:alpine

# Copy the build output to the web server's directory
#COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 3001
EXPOSE 3001


# Start the Next.js application
CMD ["npm", "start"]
#RUN npm run dev

# Start Nginx
#CMD ["nginx", "-g", "daemon off;"]
