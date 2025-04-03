FROM node:18-alpine

# Install OpenSSL
RUN apk add --no-cache openssl

WORKDIR /app

# Copy package files and prisma files first
COPY package*.json ./
COPY prisma ./prisma/

# Now install dependencies
RUN npm install

# Then copy everything else
COPY . .

# Build TypeScript code
RUN npm run build

EXPOSE 3000

# Create an entrypoint script
RUN echo '#!/bin/sh' > /app/entrypoint.sh && \
    echo 'npx prisma migrate deploy' >> /app/entrypoint.sh && \
    echo 'npm start' >> /app/entrypoint.sh && \
    chmod +x /app/entrypoint.sh

# Run the entrypoint script
CMD ["/app/entrypoint.sh"]
