
# Usa una imagen ligera de Node
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copia archivos de dependencias primero (para cache eficiente)
COPY package*.json ./

# Instala dependencias (incluye el driver de SQL Server: tedious)
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Puerto expuesto
EXPOSE 3000

# Comando de inicio de la aplicación
CMD ["node", "start"]