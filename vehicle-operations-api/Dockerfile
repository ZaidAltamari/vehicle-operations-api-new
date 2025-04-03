FROM node:18-alpine

# Install OpenSSL
RUN apk add --no-cache openssl

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Copy prisma directory specifically (before npm install)
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build TypeScript code
RUN npm run build

EXPOSE 3000

# Create an entrypoint script
RUN echo '#!/bin/sh \n\
npx prisma migrate deploy \n\
npm start' > /app/entrypoint.sh && chmod +x /app/entrypoint.sh

# Run the entrypoint script
CMD ["/app/entrypoint.sh"]
