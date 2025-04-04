// src/app.ts
import Fastify, { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { vehicleTypeRoutes } from './routes/vehicleTypeRoutes';
import { operationRoutes } from './routes/operationRoutes';
import { routeRoutes } from './routes/routeRoutes';
import { scheduleRoutes } from './routes/scheduleRoutes';
import { errorHandler } from './utils/errorHandler';

export function build(): FastifyInstance {
	const server = Fastify({
		logger: {
			level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
		},
	});

	server.setErrorHandler(errorHandler);

	// Updated CORS configuration to allow all origins
	server.register(fastifyCors, {
		origin: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
		credentials: true
	});

	// Updated Swagger configuration with proper server URLs
	server.register(fastifySwagger, {
		openapi: {
			info: {
				title: 'Vehicle Operations API',
				description:
					'API for managing vehicle operations, routes, and schedules',
				version: '1.0.0',
			},
			servers: [
				{
					url: process.env.RENDER_EXTERNAL_URL || 'https://vehicle-operations-api-new-6.onrender.com',
					description: 'Production server'
				},
				{
					url: 'http://localhost:3000',
					description: 'Development server'
				}
			],
		},
	});

	server.register(fastifySwaggerUi, {
		routePrefix: '/documentation',
		uiConfig: {
			docExpansion: 'list',
			deepLinking: true,
			// Set the default server to match the environment
			defaultModelsExpandDepth: 1,
			defaultModelExpandDepth: 1,
		},
	});

	server.register(vehicleTypeRoutes, { prefix: '/api/vehicles' });
	server.register(operationRoutes, { prefix: '/api/operations' });
	server.register(routeRoutes, { prefix: '/api/routes' });
	server.register(scheduleRoutes, { prefix: '/api/schedules' });

	// Add a root route for API health check
	server.get('/', async () => {
		return { status: 'ok', message: 'Vehicle Operations API is running' };
	});

	return server;
}

export async function createServer(): Promise<FastifyInstance> {
	const server = build();
	return server;
}