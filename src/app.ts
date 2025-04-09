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
import { vehicleAllocationRoutes } from './routes/vehicleAllocationRoutes';

export function build(): FastifyInstance {
	const server = Fastify({
		logger: {
			level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
		},
	});

	server.setErrorHandler(errorHandler);

	server.addHook('onSend', (request, reply, payload, done) => {
		reply.header('Cache-Control', 'no-cache, no-store, must-revalidate');
		reply.header('Pragma', 'no-cache');
		reply.header('Expires', '0');
		done(null, payload);
	});

	server.register(fastifyCors, {
		origin: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
		credentials: true,
	});

	server.register(vehicleAllocationRoutes, { prefix: '/api/allocations' });

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
					url:
						process.env.RENDER_EXTERNAL_URL ||
						'https://vehicle-operations-api-new-6.onrender.com',
					description: 'Production server',
				},
				{
					url: 'http://localhost:3000',
					description: 'Development server',
				},
			],
		},
	});

	server.register(fastifySwaggerUi, {
		routePrefix: '/documentation',
		uiConfig: {
			docExpansion: 'list',
			deepLinking: true,
			defaultModelsExpandDepth: 1,
			defaultModelExpandDepth: 1,
		},
	});

	server.register(vehicleTypeRoutes, { prefix: '/api/vehicles' });
	server.register(operationRoutes, { prefix: '/api/operations' });
	server.register(routeRoutes, { prefix: '/api/routes' });
	server.register(scheduleRoutes, { prefix: '/api/schedules' });

	server.get('/', async (request, reply) => {
		return reply.code(200).header('Content-Type', 'text/html').send(`
				<!DOCTYPE html>
				<html>
					<head>
						<title>Vehicle Operations API</title>
						<style>
							body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; color: #333; }
							h1 { color: #2c3e50; margin-bottom: 10px; }
							h2 { color: #3498db; margin-top: 30px; }
							.container { max-width: 800px; margin: 0 auto; }
							.status { padding: 20px; background-color: #f8f9fa; border-radius: 5px; border-left: 5px solid #2ecc71; }
							.links { margin-top: 30px; }
							.endpoint { background-color: #f8f9fa; padding: 15px; margin-bottom: 10px; border-radius: 5px; }
							.endpoint-name { font-weight: bold; color: #e74c3c; }
							a { color: #3498db; text-decoration: none; padding: 10px 15px; display: inline-block; background-color: #f8f9fa; border-radius: 4px; margin-right: 10px; margin-bottom: 10px; }
							a:hover { background-color: #eaeaea; text-decoration: none; }
							footer { margin-top: 50px; font-size: 0.8em; color: #95a5a6; text-align: center; }
						</style>
					</head>
					<body>
						<div class="container">
							<h1>Vehicle Operations API</h1>
							<p>API for managing vehicle operations, routes, and schedules</p>

							<div class="status">
								<p>✅ API is running successfully</p>
								<p>Server time: ${new Date().toLocaleString()}</p>
							</div>

							<h2>API Documentation</h2>
							<div class="links">
								<a href="/documentation">Swagger UI Documentation</a>
								<a href="/documentation/json">OpenAPI JSON Schema</a>
							</div>

							<h2>Available Endpoints</h2>
							<div class="endpoint">
								<span class="endpoint-name">GET /api/vehicles</span> - List all vehicle types
							</div>
							<div class="endpoint">
								<span class="endpoint-name">GET /api/operations</span> - List all operations
							</div>
							<div class="endpoint">
								<span class="endpoint-name">GET /api/routes</span> - List all routes
							</div>
							<div class="endpoint">
								<span class="endpoint-name">GET /api/schedules</span> - List all schedules
							</div>

							<footer>
								Vehicle Operations API v1.0.0 | Running on Render
							</footer>
						</div>
					</body>
				</html>
			`);
	});

	return server;
}

export async function createServer(): Promise<FastifyInstance> {
	const server = build();
	return server;
}
