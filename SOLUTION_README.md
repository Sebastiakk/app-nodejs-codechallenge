# Solución Técnica

AUTOR: [Sebastian Ramirez Herrera](https://www.linkedin.com/in/sebastian-ramirez-herrera/)

Este proyecto está completamente dockerizado, lo que facilita su despliegue y ejecución. A continuación, se detallan los
pasos para levantar el proyecto y algunas consideraciones importantes sobre su arquitectura y funcionamiento.

## Instrucciones para levantar el proyecto

1. Clonar el repositorio: Clona el repositorio en tu máquina local.
2. Ejecutar Docker Compose: Para levantar el proyecto, simplemente ejecuta el siguiente comando que se encuentra en el
   `package.json`:

```bash
npm run docker-compose:up
```

Este comando levantará todos los servicios necesarios definidos en el archivo `docker-compose.yml`, incluyendo
PostgreSQL,
Zookeeper, Kafka, y la aplicación Node.js.

## Arquitectura del Proyecto

Este proyecto sigue los principios de Arquitectura Limpia y Domain-Driven Design (DDD). Además, se han aplicado los
principios SOLID para asegurar un código mantenible y escalable.

## Uso de Swagger

Para facilitar el uso de los servicios, se ha integrado Swagger. Puedes acceder a la documentación de Swagger en la
siguiente URL una vez que el proyecto esté en ejecución:
`http://localhost:3000/swagger`

## Funcionamiento basado en eventos

Es importante mencionar que, aunque se han expuesto servicios REST, la aplicación funciona completamente a través de
eventos utilizando Kafka. Los servicios REST invocan las colas de Kafka, por lo que la interfaz REST no es estrictamente
necesaria para el funcionamiento de la aplicación.

### Nombres de los tópicos de Kafka

Los nombres de los tópicos utilizados en este proyecto son los siguientes:

- transaction.status.validate
- transaction.status.rejected
- transaction.status.approved
- transaction.status.updated
- transaction.created

# Resumen

- El proyecto está completamente dockerizado.
- Para levantar el proyecto, ejecuta `npm run docker-compose:up`.
- Se sigue la arquitectura limpia y DDD.
- Se aplican los principios SOLID.
- Swagger está disponible en http://localhost:3000/api.
- La aplicación funciona a través de eventos con Kafka, y los servicios REST invocan las colas de Kafka.
- Con estos pasos y consideraciones, deberías poder levantar y entender el funcionamiento del proyecto de manera
  efectiva.
