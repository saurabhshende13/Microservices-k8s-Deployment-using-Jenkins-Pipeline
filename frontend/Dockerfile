FROM public.ecr.aws/docker/library/node:18-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Ensure a clean install
RUN rm -rf node_modules package-lock.json && npm install --legacy-peer-deps

# Copy the rest of the application files
COPY . .

# Ensure correct permissions
RUN chmod +x node_modules/.bin/react-scripts

# Build the frontend application
RUN npm run build

# Use Nginx to serve the React app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
