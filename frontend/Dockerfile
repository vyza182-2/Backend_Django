# ==========================================
# Stage 1: Build React Application
# ==========================================
FROM node:20-alpine AS build

WORKDIR /app

# Copy package manifests first for optimal caching
COPY package.json package-lock.json* bun.lock* ./

# Install dependencies
RUN npm install

# Copy frontend source code
COPY . .

# Build production bundle
RUN npm run build

# ==========================================
# Stage 2: Serve with Lightweight Nginx
# ==========================================
FROM nginx:alpine

# Remove default nginx html files
RUN rm -rf /usr/share/nginx/html/*

# Copy build artifacts from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
