FROM node:8.16.0-alpine as builder

ARG environment=local

WORKDIR /app

COPY . /app

RUN cp src/environments/environment.${environment}.ts src/environments/environment.ts

RUN npm install -g @angular/cli@7.3.9 \
        && npm install \
        && npm run build

FROM nginx:1.16.0-alpine as prod

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist/ .

EXPOSE 80
