# Bemi Prisma Example

You can find a demo and detailed documentation here https://docs.bemi.io.

## System Dependencies

* Devbox
  * PostgreSQL
  * Bun

## Installation

```
make init
make up-services
make create
cp server/.env.sample server/.env
```

## Development

```
make install
make migrate
make up
```
