// src/routes/routeRoutes.ts
import { FastifyInstance } from 'fastify';
import { RouteController } from '../controllers/routeController';

export async function routeRoutes(server: FastifyInstance): Promise<void> {
	const controller = new RouteController();

	// Create a new route
	server.post(
		'/',
		{
			schema: {
				body: {
					type: 'object',
					required: [
						'source',
						'destination',
						'distance',
						'estimatedDuration',
					],
					properties: {
						source: { type: 'string' },
						destination: { type: 'string' },
						distance: { type: 'number' },
						estimatedDuration: { type: 'integer' },
					},
				},
				response: {
					201: {
						type: 'object',
						properties: {
							id: { type: 'string' },
							source: { type: 'string' },
							destination: { type: 'string' },
							distance: { type: 'number' },
							estimatedDuration: { type: 'integer' },
							createdAt: { type: 'string', format: 'date-time' },
							updatedAt: { type: 'string', format: 'date-time' },
						},
					},
				},
			},
		},
		controller.createRoute.bind(controller),
	);

	// Get all routes
	server.get('/', controller.getRoutes.bind(controller));

	// Get a specific route by ID
	server.get('/:id', controller.getRouteById.bind(controller));

	// Update a route
	server.put(
		'/:id',
		{
			schema: {
				body: {
					type: 'object',
					required: [
						'source',
						'destination',
						'distance',
						'estimatedDuration',
					],
					properties: {
						source: { type: 'string' },
						destination: { type: 'string' },
						distance: { type: 'number' },
						estimatedDuration: { type: 'integer' },
					},
				},
			},
		},
		controller.updateRoute.bind(controller),
	);

	// Delete a route
	server.delete('/:id', controller.deleteRoute.bind(controller));
}
