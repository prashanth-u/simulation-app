FROM node:23

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN apt-get update && apt-get install -y postgresql-client
RUN npm install
COPY . .
RUN chmod +x startup.sh
RUN npx prisma generate --schema=./prisma/schema.prisma
EXPOSE 4000
CMD ["npx", "tsx", "src/server.ts"]
