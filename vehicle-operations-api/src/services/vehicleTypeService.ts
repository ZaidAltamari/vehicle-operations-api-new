// src/services/vehicleTypeService.ts
import { VehicleType } from '@prisma/client';
import { CreateVehicleTypeInput } from '../validators/vehicleTypeValidator';
import { VehicleTypeRepository } from '../repositories/vehicleRepository';

export class VehicleTypeService {
	private vehicleTypeRepository: VehicleTypeRepository;

	constructor() {
		this.vehicleTypeRepository = new VehicleTypeRepository();
	}

	async createVehicleType(data: CreateVehicleTypeInput): Promise<VehicleType> {
		try {
			return await this.vehicleTypeRepository.create(data);
		} catch (error) {
			throw error;
		}
	}

	async getVehicleTypes(): Promise<VehicleType[]> {
		try {
			return await this.vehicleTypeRepository.findAll();
		} catch (error) {
			throw error;
		}
	}

	async getVehicleTypeById(id: string): Promise<VehicleType | null> {
		try {
			return await this.vehicleTypeRepository.findById(id);
		} catch (error) {
			throw error;
		}
	}

	async updateVehicleType(
		id: string,
		data: CreateVehicleTypeInput,
	): Promise<VehicleType | null> {
		try {
			return await this.vehicleTypeRepository.update(id, data);
		} catch (error) {
			throw error;
		}
	}

	async deleteVehicleType(id: string): Promise<VehicleType | null> {
		try {
			return await this.vehicleTypeRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}
}
