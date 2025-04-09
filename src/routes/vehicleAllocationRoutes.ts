// src/routes/vehicleAllocationRoutes.ts
import { FastifyInstance } from 'fastify';
import { VehicleAllocationController } from '../controllers/vehicleAllocationController';

export async function vehicleAllocationRoutes(
	server: FastifyInstance,
): Promise<void> {
	const controller = new VehicleAllocationController();

	server.post(
		'/',
		{
			schema: {
				body: {
					type: 'object',
					required: ['operationId', 'vehicleTypeId', 'quantity'],
					properties: {
						operationId: { type: 'string' },
						vehicleTypeId: { type: 'string' },
						quantity: { type: 'integer' },
						description: { type: 'string' },
					},
				},
				response: {
					201: {
						type: 'object',
						properties: {
							id: { type: 'string' },
							operationId: { type: 'string' },
							vehicleTypeId: { type: 'string' },
							quantity: { type: 'integer' },
							description: { type: 'string' },
							createdAt: { type: 'string', format: 'date-time' },
							updatedAt: { type: 'string', format: 'date-time' },
						},
					},
				},
			},
		},
		controller.createVehicleAllocation.bind(controller),
	);

	server.get('/', controller.getVehicleAllocations.bind(controller));
	server.get('/:id', controller.getVehicleAllocationById.bind(controller));
	server.get(
		'/operation/:operationId',
		controller.getVehicleAllocationsByOperation.bind(controller),
	);

	server.put(
		'/:id',
		{
			schema: {
				body: {
					type: 'object',
					required: ['operationId', 'vehicleTypeId', 'quantity'],
					properties: {
						operationId: { type: 'string' },
						vehicleTypeId: { type: 'string' },
						quantity: { type: 'integer' },
						description: { type: 'string' },
					},
				},
			},
		},
		controller.updateVehicleAllocation.bind(controller),
	);

	server.delete('/:id', controller.deleteVehicleAllocation.bind(controller));
}
