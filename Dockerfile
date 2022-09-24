FROM nginx:latest

WORKDIR /app
COPY build /app
COPY nginx.conf /etc/nginx/nginx.conf