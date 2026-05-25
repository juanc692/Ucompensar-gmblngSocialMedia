FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

EXPOSE 3000


CMD ["npm", "run", "dev"]