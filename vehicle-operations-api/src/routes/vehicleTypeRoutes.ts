// src/routes/vehicleTypeRoutes.ts
import { FastifyInstance } from 'fastify';
import { VehicleTypeController } from '../controllers/vehicleTypeController';

export async function vehicleTypeRoutes(
	server: FastifyInstance,
): Promise<void> {
	const controller = new VehicleTypeController();

	server.post(
		'/',
		{
			schema: {
				body: {
					type: 'object',
					required: ['name', 'capacity'],
					properties: {
						name: { type: 'string' },
						capacity: { type: 'integer' },
					},
				},
				response: {
					201: {
						type: 'object',
						properties: {
							id: { type: 'string' },
							name: { type: 'string' },
							capacity: { type: 'integer' },
							createdAt: { type: 'string', format: 'date-time' },
							updatedAt: { type: 'string', format: 'date-time' },
						},
					},
				},
			},
		},
		controller.createVehicleType.bind(controller),
	);

	server.get('/', controller.getVehicleTypes.bind(controller));
	server.get('/:id', controller.getVehicleTypeById.bind(controller));

	server.put(
		'/:id',
		{
			schema: {
				body: {
					type: 'object',
					required: ['name', 'capacity'],
					properties: {
						name: { type: 'string' },
						capacity: { type: 'integer' },
					},
				},
			},
		},
		controller.updateVehicleType.bind(controller),
	);

	server.delete('/:id', controller.deleteVehicleType.bind(controller));
}
