# Simon Movilidad V4

Esta carpeta contiene una copia independiente de la pagina aprobada en `app/v4`.

## Desarrollo local

```bash
npm ci
npm run dev
```

## Docker

```bash
docker build -t simon-v4 .
docker run --rm -p 3000:3000 simon-v4
```
