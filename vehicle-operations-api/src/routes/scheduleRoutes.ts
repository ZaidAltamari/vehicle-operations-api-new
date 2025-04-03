// src/routes/scheduleRoutes.ts
import { FastifyInstance } from 'fastify';
import { ScheduleController } from '../controllers/scheduleController';

export async function scheduleRoutes(server: FastifyInstance): Promise<void> {
	const controller = new ScheduleController();

	server.post(
		'/',
		{
			schema: {
				body: {
					type: 'object',
					required: [
						'operationId',
						'vehicleTypeId',
						'routeId',
						'date',
						'startTime',
						'endTime',
					],
					properties: {
						operationId: { type: 'string' },
						vehicleTypeId: { type: 'string' },
						routeId: { type: 'string' },
						date: { type: 'string', format: 'date-time' },
						startTime: { type: 'string', format: 'date-time' },
						endTime: { type: 'string', format: 'date-time' },
					},
				},
				response: {
					201: {
						type: 'object',
						properties: {
							id: { type: 'string' },
							operationId: { type: 'string' },
							vehicleTypeId: { type: 'string' },
							routeId: { type: 'string' },
							date: { type: 'string', format: 'date-time' },
							startTime: { type: 'string', format: 'date-time' },
							endTime: { type: 'string', format: 'date-time' },
							createdAt: { type: 'string', format: 'date-time' },
							updatedAt: { type: 'string', format: 'date-time' },
						},
					},
				},
			},
		},
		controller.createSchedule.bind(controller),
	);

	server.get('/', controller.getSchedules.bind(controller));

	server.get('/:id', controller.getScheduleById.bind(controller));

	server.get(
		'/operation/:operationId',
		controller.getSchedulesByOperation.bind(controller),
	);

	server.put(
		'/:id',
		{
			schema: {
				body: {
					type: 'object',
					required: [
						'operationId',
						'vehicleTypeId',
						'routeId',
						'date',
						'startTime',
						'endTime',
					],
					properties: {
						operationId: { type: 'string' },
						vehicleTypeId: { type: 'string' },
						routeId: { type: 'string' },
						date: { type: 'string', format: 'date-time' },
						startTime: { type: 'string', format: 'date-time' },
						endTime: { type: 'string', format: 'date-time' },
					},
				},
			},
		},
		controller.updateSchedule.bind(controller),
	);

	server.delete('/:id', controller.deleteSchedule.bind(controller));
}
