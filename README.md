# AngularBase

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3.

## Entorno

Copiamos variables para el entorno local.

`cp src/environments/environment.local.ts src/environments/environment.ts`  

## Desarrollo

`npm run start` la aplicación estará disponible en `http://localhost:4200`.

## Build

`npm run build` para generar build del proyecto en la carpeta `dist/` usando `environment.ts`.

## Docker

Luego de crear el build ejecutar
```
docker-compose -f docker/docker-compose.yml stop
docker-compose -f docker/docker-compose.yml up -d
```

La aplicación quedará disponible en `http://localhost:8002`
