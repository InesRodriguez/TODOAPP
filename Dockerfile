# Establecer la imagen base
FROM node:20.9.0-alpine3.17

# Establecer el directorio de trabajo en la aplicación
WORKDIR /app

# Copiar los archivos del paquete.json y el paquete-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN rm -rf node_modules && npm ci

# Después de instalar las dependencias
RUN npm install -g @angular/cli

# Instalar firebase tools

RUN npm install -g firebase-tools

# Copiar el resto de los archivos de la aplicación
COPY . .

# Instalar esbuild específicamente en el sistema de destino
RUN npm install esbuild

# Exponer el puerto 4200
EXPOSE 4200

# Exponer el puerto 9005
EXPOSE 9005


# Iniciar la aplicación
# Iniciar la aplicación
CMD ["./node_modules/.bin/ng", "serve", "--host", "0.0.0.0","--poll","2500"]
