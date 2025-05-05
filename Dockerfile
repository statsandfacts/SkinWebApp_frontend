# Stage 1: Build the Next.js application
FROM node:20 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production container
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy only what's needed to run the app
COPY --from=builder /usr/src/app ./

RUN npm install --production

# Expose your frontend port
EXPOSE 3001

# Start Next.js server
CMD ["npm", "start"]
