FROM node:22-alpine

WORKDIR /app

# Instalar Angular CLI globalmente en el contenedor
RUN npm install -g @angular/cli

# Copiar dependencias
COPY package*.json ./
RUN npm install

# Copiar código del frontend
COPY . .

# Exponer el puerto por defecto de Angular
EXPOSE 4200

# Ejecutar el servidor apuntando a todas las interfaces de red
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]