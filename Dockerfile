FROM node:lts-alpine as builder
WORKDIR /front
COPY . /front
RUN npm install --registry=https://registry.npm.taobao.org && npm run build

FROM nginx:latest
WORKDIR /app
COPY --from=builder ../front/build /app
COPY nginx.conf /etc/nginx/nginx.conf