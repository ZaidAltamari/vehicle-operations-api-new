// src/controllers/scheduleController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateScheduleInput } from '../validators/scheduleValidator';
import { ScheduleService } from '../services/scheduleService';

export class ScheduleController {
	private scheduleService: ScheduleService;

	constructor() {
		this.scheduleService = new ScheduleService();
	}

	async createSchedule(
		request: FastifyRequest<{ Body: CreateScheduleInput }>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			if (
				!request.body ||
				!request.body.operationId ||
				!request.body.vehicleTypeId ||
				!request.body.routeId ||
				!request.body.date ||
				!request.body.startTime ||
				!request.body.endTime
			) {
				return reply.code(400).send({
					error: 'Bad Request',
					message: 'All schedule fields are required',
				});
			}

			const schedule = await this.scheduleService.createSchedule(
				request.body,
			);
			return reply.code(201).send(schedule);
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to create schedule',
				details: error instanceof Error ? error.message : 'Unknown error',
			});
		}
	}

	async getSchedules(
		_request: FastifyRequest,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			const schedules = await this.scheduleService.getSchedules();
			return reply.code(200).send(schedules);
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to retrieve schedules',
			});
		}
	}

	async getScheduleById(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			const schedule = await this.scheduleService.getScheduleById(
				request.params.id,
			);

			if (!schedule) {
				return reply.code(404).send({ message: 'Schedule not found' });
			}

			return reply.code(200).send(schedule);
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to retrieve schedule',
			});
		}
	}

	async getSchedulesByOperation(
		request: FastifyRequest<{ Params: { operationId: string } }>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			const schedules = await this.scheduleService.getSchedulesByOperationId(
				request.params.operationId,
			);
			return reply.code(200).send(schedules);
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to retrieve schedules',
			});
		}
	}

	async updateSchedule(
		request: FastifyRequest<{
			Params: { id: string };
			Body: CreateScheduleInput;
		}>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			if (
				!request.body ||
				!request.body.operationId ||
				!request.body.vehicleTypeId ||
				!request.body.routeId ||
				!request.body.date ||
				!request.body.startTime ||
				!request.body.endTime
			) {
				return reply.code(400).send({
					error: 'Bad Request',
					message: 'All schedule fields are required',
				});
			}

			const schedule = await this.scheduleService.updateSchedule(
				request.params.id,
				request.body,
			);

			if (!schedule) {
				return reply.code(404).send({ message: 'Schedule not found' });
			}

			return reply.code(200).send(schedule);
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to update schedule',
			});
		}
	}

	async deleteSchedule(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			const deleted = await this.scheduleService.deleteSchedule(
				request.params.id,
			);

			if (!deleted) {
				return reply.code(404).send({ message: 'Schedule not found' });
			}

			return reply.code(204).send();
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to delete schedule',
			});
		}
	}
}
