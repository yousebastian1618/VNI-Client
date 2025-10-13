# ---------- Build stage ----------
FROM node:22-alpine AS build
WORKDIR /app

# Install deps first (better layer caching)
COPY package*.json ./
RUN yarn

# Copy the rest and build
COPY . .
# Build Angular app in production mode (Angular 15+ builder)
RUN yarn build --configuration local

# ---------- Run stage ----------
FROM nginx:alpine AS run
# Clean default conf and add ours (SPA fallback, caching, gzip/brotli if available)
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Angular 16+ with application builder outputs to dist/<package-name>/browser
# Your package name is "youfolio-client"
COPY --from=build /app/dist/VNI-Client/browser /usr/share/nginx/html


EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD wget -qO- http://127.0.0.1/ > /dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
