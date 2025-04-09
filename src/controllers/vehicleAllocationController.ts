// src/controllers/vehicleAllocationController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateVehicleAllocationInput } from '../validators/vehicleAllocationValidator';
import { VehicleAllocationService } from '../services/vehicleAllocationService';

export class VehicleAllocationController {
	private vehicleAllocationService: VehicleAllocationService;

	constructor() {
		this.vehicleAllocationService = new VehicleAllocationService();
	}

	async createVehicleAllocation(
		request: FastifyRequest<{ Body: CreateVehicleAllocationInput }>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			if (
				!request.body ||
				!request.body.operationId ||
				!request.body.vehicleTypeId ||
				request.body.quantity === undefined
			) {
				return reply.code(400).send({
					error: 'Bad Request',
					message:
						'Operation ID, vehicle type ID, and quantity are required',
				});
			}

			const vehicleAllocation =
				await this.vehicleAllocationService.createVehicleAllocation(
					request.body,
				);
			return reply.code(201).send(vehicleAllocation);
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to create vehicle allocation',
				details: error instanceof Error ? error.message : 'Unknown error',
			});
		}
	}

	async getVehicleAllocations(
		_request: FastifyRequest,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			const vehicleAllocations =
				await this.vehicleAllocationService.getVehicleAllocations();
			return reply.code(200).send(vehicleAllocations);
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to retrieve vehicle allocations',
			});
		}
	}

	async getVehicleAllocationById(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			const vehicleAllocation =
				await this.vehicleAllocationService.getVehicleAllocationById(
					request.params.id,
				);

			if (!vehicleAllocation) {
				return reply
					.code(404)
					.send({ message: 'Vehicle allocation not found' });
			}

			return reply.code(200).send(vehicleAllocation);
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to retrieve vehicle allocation',
			});
		}
	}

	async getVehicleAllocationsByOperation(
		request: FastifyRequest<{ Params: { operationId: string } }>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			const vehicleAllocations =
				await this.vehicleAllocationService.getVehicleAllocationsByOperationId(
					request.params.operationId,
				);
			return reply.code(200).send(vehicleAllocations);
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to retrieve vehicle allocations',
			});
		}
	}

	async updateVehicleAllocation(
		request: FastifyRequest<{
			Params: { id: string };
			Body: CreateVehicleAllocationInput;
		}>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			if (
				!request.body ||
				!request.body.operationId ||
				!request.body.vehicleTypeId ||
				request.body.quantity === undefined
			) {
				return reply.code(400).send({
					error: 'Bad Request',
					message:
						'Operation ID, vehicle type ID, and quantity are required',
				});
			}

			const vehicleAllocation =
				await this.vehicleAllocationService.updateVehicleAllocation(
					request.params.id,
					request.body,
				);

			if (!vehicleAllocation) {
				return reply
					.code(404)
					.send({ message: 'Vehicle allocation not found' });
			}

			return reply.code(200).send(vehicleAllocation);
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to update vehicle allocation',
			});
		}
	}

	async deleteVehicleAllocation(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			const deleted =
				await this.vehicleAllocationService.deleteVehicleAllocation(
					request.params.id,
				);

			if (!deleted) {
				return reply
					.code(404)
					.send({ message: 'Vehicle allocation not found' });
			}

			return reply.code(204).send();
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to delete vehicle allocation',
			});
		}
	}
}
