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

Crear imagen con tag (ej: 1.0.0) y para 
un environment (local, dev, pre o prod)

Por defecto el environment es 'local' 
```
docker build --build-arg environment=local \
  -t registry.cnrt.gob.ar/angular/base:1.0.0 \
  -f docker/Dockerfile .
```

Luego de crear la imagen ejecutar
```
docker-compose -f docker/docker-compose.yml stop
docker-compose -f docker/docker-compose.yml up -d
```

La aplicación quedará disponible en `http://localhost:8002`
