# Stage 1: Build
FROM node:26-alpine AS builder

WORKDIR /app

# Copiar package*.json
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production && \
    npm ci --only=optional

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# ============================================

# Stage 2: Serve com Nginx
FROM nginx:1.27-alpine

# Remover arquivo padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar configuração customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar arquivos buildados do estágio anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor porta
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/index.html || exit 1

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]

