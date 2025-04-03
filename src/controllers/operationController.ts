// src/controllers/operationController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateOperationInput } from '../validators/operationValidator';
import { OperationService } from '../services/operationService';

export class OperationController {
	private operationService: OperationService;

	constructor() {
		this.operationService = new OperationService();
	}

	async createOperation(
		request: FastifyRequest<{ Body: CreateOperationInput }>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			if (
				!request.body ||
				!request.body.name ||
				!request.body.startDate ||
				!request.body.endDate
			) {
				return reply.code(400).send({
					error: 'Bad Request',
					message: 'Operation name, start date, and end date are required',
				});
			}

			const operation = await this.operationService.createOperation(
				request.body,
			);
			return reply.code(201).send(operation);
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to create operation',
				details: error instanceof Error ? error.message : 'Unknown error',
			});
		}
	}

	async getOperations(
		_request: FastifyRequest,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			const operations = await this.operationService.getOperations();
			return reply.code(200).send(operations);
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to retrieve operations',
			});
		}
	}

	async getOperationById(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			const operation = await this.operationService.getOperationById(
				request.params.id,
			);

			if (!operation) {
				return reply.code(404).send({ message: 'Operation not found' });
			}

			return reply.code(200).send(operation);
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to retrieve operation',
			});
		}
	}

	async updateOperation(
		request: FastifyRequest<{
			Params: { id: string };
			Body: CreateOperationInput;
		}>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			if (
				!request.body ||
				!request.body.name ||
				!request.body.startDate ||
				!request.body.endDate
			) {
				return reply.code(400).send({
					error: 'Bad Request',
					message: 'Operation name, start date, and end date are required',
				});
			}

			const operation = await this.operationService.updateOperation(
				request.params.id,
				request.body,
			);

			if (!operation) {
				return reply.code(404).send({ message: 'Operation not found' });
			}

			return reply.code(200).send(operation);
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to update operation',
			});
		}
	}

	async updateOperationStatus(
		request: FastifyRequest<{
			Params: { id: string };
			Body: { status: string };
		}>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			if (!request.body || !request.body.status) {
				return reply.code(400).send({
					error: 'Bad Request',
					message: 'Operation status is required',
				});
			}

			const operation = await this.operationService.updateOperationStatus(
				request.params.id,
				request.body.status,
			);

			if (!operation) {
				return reply.code(404).send({ message: 'Operation not found' });
			}

			return reply.code(200).send(operation);
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to update operation status',
			});
		}
	}

	async deleteOperation(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			const deleted = await this.operationService.deleteOperation(
				request.params.id,
			);

			if (!deleted) {
				return reply.code(404).send({ message: 'Operation not found' });
			}

			return reply.code(204).send();
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to delete operation',
			});
		}
	}
}
