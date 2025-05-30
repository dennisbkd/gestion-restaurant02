FROM node:20

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copiar el código fuente
COPY . .

# Construir la app para producción
RUN npm run build

# Instalar un servidor estático (serve)
RUN npm install -g serve

# Exponer puerto
EXPOSE 5173

# Servir la app construida desde dist/
CMD ["serve", "-s", "dist", "-l", "5173"]
