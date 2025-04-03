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

	server.register(fastifyCors);

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
					url: 'http://localhost:3000',
				},
			],
		},
	});

	server.register(fastifySwaggerUi, {
		routePrefix: '/documentation',
		uiConfig: {
			docExpansion: 'list',
		},
	});

	server.register(vehicleTypeRoutes, { prefix: '/api/vehicles' }); // Changed to vehicleRoutes
	server.register(operationRoutes, { prefix: '/api/operations' });
	server.register(routeRoutes, { prefix: '/api/routes' });
	server.register(scheduleRoutes, { prefix: '/api/schedules' });

	return server;
}

export async function createServer(): Promise<FastifyInstance> {
	const server = build();
	return server;
}
