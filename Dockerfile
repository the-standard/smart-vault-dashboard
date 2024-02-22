FROM node:18-alpine3.17 as build
WORKDIR /app
COPY . /app
ARG opensea_key
ARG alchemy_key
ARG alchemy_sepolia_key
ARG walletconnect_id
ENV VITE_OPENSEA_API_KEY $opensea_key
ENV VITE_ALCHEMY_API_KEY $alchemy_key
ENV VITE_ALCHEMY_SEPOLIA_API_KEY $alchemy_sepolia_key
ENV VITE_WALLETCONNECT_ID $walletconnect_id
RUN apk --no-cache --virtual build-dependencies add \
  g++ gcc libgcc libstdc++ linux-headers make python3
RUN yarn install
RUN yarn run build

FROM ubuntu
RUN apt-get update
RUN apt-get install nginx -y
COPY ./server/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/html/
EXPOSE 80
CMD ["nginx","-g","daemon off;","-c","/etc/nginx/conf.d/default.conf"]