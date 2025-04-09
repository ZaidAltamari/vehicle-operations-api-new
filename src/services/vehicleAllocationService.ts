// src/services/vehicleAllocationService.ts
import { VehicleAllocation } from '@prisma/client';
import { CreateVehicleAllocationInput } from '../validators/vehicleAllocationValidator';
import { VehicleAllocationRepository } from '../repositories/vehicleAllocationRepository';

export class VehicleAllocationService {
	private vehicleAllocationRepository: VehicleAllocationRepository;

	constructor() {
		this.vehicleAllocationRepository = new VehicleAllocationRepository();
	}

	async createVehicleAllocation(
		data: CreateVehicleAllocationInput,
	): Promise<VehicleAllocation> {
		try {
			return await this.vehicleAllocationRepository.create(data);
		} catch (error) {
			throw error;
		}
	}

	async getVehicleAllocations(): Promise<VehicleAllocation[]> {
		try {
			return await this.vehicleAllocationRepository.findAll();
		} catch (error) {
			throw error;
		}
	}

	async getVehicleAllocationById(
		id: string,
	): Promise<VehicleAllocation | null> {
		try {
			return await this.vehicleAllocationRepository.findById(id);
		} catch (error) {
			throw error;
		}
	}

	async getVehicleAllocationsByOperationId(
		operationId: string,
	): Promise<VehicleAllocation[]> {
		try {
			return await this.vehicleAllocationRepository.findByOperationId(
				operationId,
			);
		} catch (error) {
			throw error;
		}
	}

	async updateVehicleAllocation(
		id: string,
		data: CreateVehicleAllocationInput,
	): Promise<VehicleAllocation | null> {
		try {
			return await this.vehicleAllocationRepository.update(id, data);
		} catch (error) {
			throw error;
		}
	}

	async deleteVehicleAllocation(
		id: string,
	): Promise<VehicleAllocation | null> {
		try {
			return await this.vehicleAllocationRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}
}
