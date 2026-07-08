FROM node:16-alpine
RUN apk add --no-cache chromium ca-certificates
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN mkdir -p logs sessions
RUN cp .env.example .env
EXPOSE 3000
CMD ["npm", "start"]
