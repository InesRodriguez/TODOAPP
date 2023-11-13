# Establecer la imagen base
FROM node:20.9.0-alpine3.17

# Establecer el directorio de trabajo en la aplicación
WORKDIR /app

# Copiar los archivos del paquete.json y el paquete-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN rm -rf node_modules && npm ci

# Copiar el resto de los archivos de la aplicación
COPY . .

# Instalar esbuild específicamente en el sistema de destino
RUN npm install esbuild

# Exponer el puerto 4200
EXPOSE 4200

# Iniciar la aplicación
# Iniciar la aplicación
CMD ["./node_modules/.bin/ng", "serve", "--host", "0.0.0.0"]
