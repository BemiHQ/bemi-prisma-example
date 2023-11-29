# Bemi Prisma Example

See the documentation here https://github.com/BemiHQ/prisma

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
