FROM node:18-alpine3.17 as build
WORKDIR /app
COPY . /app
RUN apk --no-cache --virtual build-dependencies add \
  g++ gcc libgcc libstdc++ linux-headers make python3
RUN yarn install
RUN yarn run build

FROM ubuntu
RUN apt-get update
RUN apt-get install nginx -y
COPY --from=build /app/dist /var/www/html/
EXPOSE 80
CMD ["nginx","-g","daemon off;"]