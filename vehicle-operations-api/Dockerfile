FROM node:18-alpine

# Install OpenSSL
RUN apk add --no-cache openssl

WORKDIR /app

# Copy all files first
COPY . .

# Install dependencies
RUN npm install

# Build TypeScript code
RUN npm run build

EXPOSE 3000

# Create an entrypoint script
RUN echo '#!/bin/sh \n\
npx prisma migrate deploy \n\
npm start' > /app/entrypoint.sh && chmod +x /app/entrypoint.sh

# Run the entrypoint script
CMD ["/app/entrypoint.sh"]
