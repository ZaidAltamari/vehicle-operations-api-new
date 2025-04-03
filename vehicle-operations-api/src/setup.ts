// tests/setup.ts
// import { build } from '../src/app';
import { PrismaClient } from '@prisma/client';
import { beforeAll, afterAll } from '@jest/globals';
import { build } from './app';

// Create a Fastify app instance for testing
const app = build();

// Create a Prisma client for testing
const prisma = new PrismaClient();

// Make sure to close Prisma when tests are done
beforeAll(async () => {
	await prisma.$connect();
});

afterAll(async () => {
	await prisma.$disconnect();
});

// Export both for use in tests
export { app, prisma };
