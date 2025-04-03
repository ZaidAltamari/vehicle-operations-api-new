// src/controllers/vehicleTypeController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { VehicleTypeService } from '../services/vehicleTypeService';
import { CreateVehicleTypeInput } from '../validators/vehicleTypeValidator';

export class VehicleTypeController {
	private vehicleTypeService: VehicleTypeService;

	constructor() {
		this.vehicleTypeService = new VehicleTypeService();
	}

	async createVehicleType(
		request: FastifyRequest<{ Body: CreateVehicleTypeInput }>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			const vehicleType = await this.vehicleTypeService.createVehicleType(
				request.body,
			);
			return reply.code(201).send(vehicleType);
		} catch (error) {
			throw error;
		}
	}

	async getVehicleTypes(
		_request: FastifyRequest,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			const vehicleTypes = await this.vehicleTypeService.getVehicleTypes();
			return reply.code(200).send(vehicleTypes);
		} catch (error) {
			throw error;
		}
	}

	async getVehicleTypeById(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			const vehicleType = await this.vehicleTypeService.getVehicleTypeById(
				request.params.id,
			);
			if (!vehicleType) {
				return reply.code(404).send({ message: 'Vehicle type not found' });
			}
			return reply.code(200).send(vehicleType);
		} catch (error) {
			throw error;
		}
	}

	async updateVehicleType(
		request: FastifyRequest<{
			Params: { id: string };
			Body: CreateVehicleTypeInput;
		}>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			const vehicleType = await this.vehicleTypeService.updateVehicleType(
				request.params.id,
				request.body,
			);
			if (!vehicleType) {
				return reply.code(404).send({ message: 'Vehicle type not found' });
			}
			return reply.code(200).send(vehicleType);
		} catch (error) {
			throw error;
		}
	}

	async deleteVehicleType(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			const deleted = await this.vehicleTypeService.deleteVehicleType(
				request.params.id,
			);
			if (!deleted) {
				return reply.code(404).send({ message: 'Vehicle type not found' });
			}
			return reply.code(204).send();
		} catch (error) {
			throw error;
		}
	}
}
