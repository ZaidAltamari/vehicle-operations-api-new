// src/services/operationService.ts
import { VehicleOperation } from '@prisma/client';
import { CreateOperationInput } from '../validators/operationValidator';
import { OperationRepository } from '../repositories/operationRepository';

export class OperationService {
	private operationRepository: OperationRepository;

	constructor() {
		this.operationRepository = new OperationRepository();
	}

	async createOperation(
		data: CreateOperationInput,
	): Promise<VehicleOperation> {
		try {
			return await this.operationRepository.create(data);
		} catch (error) {
			throw error;
		}
	}

	async getOperations(): Promise<VehicleOperation[]> {
		try {
			return await this.operationRepository.findAll();
		} catch (error) {
			throw error;
		}
	}

	async getOperationById(id: string): Promise<VehicleOperation | null> {
		try {
			return await this.operationRepository.findById(id);
		} catch (error) {
			throw error;
		}
	}

	async updateOperation(
		id: string,
		data: CreateOperationInput,
	): Promise<VehicleOperation | null> {
		try {
			return await this.operationRepository.update(id, data);
		} catch (error) {
			throw error;
		}
	}

	async updateOperationStatus(
		id: string,
		status: string,
	): Promise<VehicleOperation | null> {
		try {
			return await this.operationRepository.updateStatus(id, status);
		} catch (error) {
			throw error;
		}
	}

	async deleteOperation(id: string): Promise<VehicleOperation | null> {
		try {
			return await this.operationRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}
}
