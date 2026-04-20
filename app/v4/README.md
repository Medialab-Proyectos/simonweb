# Simon Movilidad V4

Esta carpeta contiene la pagina aprobada V4 como proyecto independiente de Next.js.
El contenedor sirve la pagina en `/v4`, por ejemplo `http://localhost:3000/v4`.

## Desarrollo local

```bash
npm ci
npm run dev
```

Abrir:

```bash
http://localhost:3000/v4
```

## Docker

```bash
docker build -t simon-v4 .
docker run --rm -p 3000:3000 simon-v4
```

Con Docker Compose:

```bash
docker compose up --build -d
```

El contexto de Docker debe ser esta carpeta (`app/v4`). No necesita las carpetas
raiz `components`, `lib`, `hooks` ni `public`.
