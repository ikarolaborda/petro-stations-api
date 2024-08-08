FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
RUN npm run compile:data-source

# Add wait-for-it script
COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

# Debugging step: List files in the dist directory
RUN echo "Contents of dist directory:" && ls -la dist

# Expose the port the app runs on.
EXPOSE 3000

# Run the web service on container startup.
CMD ["sh", "-c", "./wait-for-it.sh ${DATABASE_HOST} ${DATABASE_PORT} -- npx typeorm migration:run -d dist/data-source.js && node dist/seeds/seed.js && node dist/main"]
