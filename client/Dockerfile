# Etapa 1: Build
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Etapa 2: Producción
FROM node:20-alpine AS production
WORKDIR /app
RUN npm install -g serve

# Copia los archivos de la etapa de build
COPY --from=build /app/dist ./dist

EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
