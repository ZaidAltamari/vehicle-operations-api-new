// src/routes/operationRoutes.ts
import { FastifyInstance } from 'fastify';
import { OperationController } from '../controllers/operationController';

export async function operationRoutes(server: FastifyInstance): Promise<void> {
	const controller = new OperationController();

	// Create a new operation
	server.post(
		'/',
		{
			schema: {
				body: {
					type: 'object',
					required: ['name', 'startDate', 'endDate'],
					properties: {
						name: { type: 'string' },
						startDate: { type: 'string', format: 'date-time' },
						endDate: { type: 'string', format: 'date-time' },
						status: { type: 'string' },
					},
				},
				response: {
					201: {
						type: 'object',
						properties: {
							id: { type: 'string' },
							name: { type: 'string' },
							startDate: { type: 'string', format: 'date-time' },
							endDate: { type: 'string', format: 'date-time' },
							status: { type: 'string' },
							createdAt: { type: 'string', format: 'date-time' },
							updatedAt: { type: 'string', format: 'date-time' },
						},
					},
				},
			},
		},
		controller.createOperation.bind(controller),
	);

	// Get all operations
	server.get('/', controller.getOperations.bind(controller));

	// Get a specific operation by ID
	server.get('/:id', controller.getOperationById.bind(controller));

	// Update an operation
	server.put(
		'/:id',
		{
			schema: {
				body: {
					type: 'object',
					required: ['name', 'startDate', 'endDate'],
					properties: {
						name: { type: 'string' },
						startDate: { type: 'string', format: 'date-time' },
						endDate: { type: 'string', format: 'date-time' },
						status: { type: 'string' },
					},
				},
			},
		},
		controller.updateOperation.bind(controller),
	);

	// Update operation status
	server.patch(
		'/:id/status',
		{
			schema: {
				body: {
					type: 'object',
					required: ['status'],
					properties: {
						status: { type: 'string' },
					},
				},
			},
		},
		controller.updateOperationStatus.bind(controller),
	);

	// Delete an operation
	server.delete('/:id', controller.deleteOperation.bind(controller));
}
