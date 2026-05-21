# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## 🐳 Docker

### Build da imagem

```bash
docker build -t gastos-mensais-front:latest .
```

### Rodar container

```bash
docker run -p 3000:80 gastos-mensais-front:latest
```

Acesse em: `http://localhost:3000`

### Docker Compose

```bash
docker-compose up -d
```

O serviço estará disponível em `http://localhost:3000`

### Parar container

```bash
docker-compose down
```

### Estrutura Docker

- **Dockerfile**: Multi-stage build (Node 26 para build + Nginx para serve)
- **nginx.conf**: Configuração do Nginx com cache, gzip e suporte a React Router
- **.dockerignore**: Otimização do contexto Docker
- **docker-compose.yml**: Orquestração simplificada

### Recursos

- ✅ Node 26-alpine (build)
- ✅ Nginx 1.27-alpine (serve)
- ✅ Compressão gzip automática
- ✅ Cache de assets estáticos (1 ano)
- ✅ React Router SPA fallback
- ✅ Healthcheck integrado
- ✅ Multi-stage build (imagem ~100MB)

