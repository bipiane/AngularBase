FROM nginx:alpine

RUN apk update
RUN apk add openssh openssl

COPY conf/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx
