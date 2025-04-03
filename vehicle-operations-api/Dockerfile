FROM node:18-alpine

# Install OpenSSL
RUN apk add --no-cache openssl

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Initialize Prisma if not already there
RUN mkdir -p prisma && \
    if [ ! -f prisma/schema.prisma ]; then \
      echo 'generator client {\n  provider = "prisma-client-js"\n}\n\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}' > prisma/schema.prisma; \
    fi

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript code
RUN npm run build

EXPOSE 3000

# Create an entrypoint script
RUN echo '#!/bin/sh' > /app/entrypoint.sh && \
    echo 'if [ -f prisma/schema.prisma ]; then npx prisma migrate deploy; fi' >> /app/entrypoint.sh && \
    echo 'npm start' >> /app/entrypoint.sh && \
    chmod +x /app/entrypoint.sh

# Run the entrypoint script
CMD ["/app/entrypoint.sh"]
