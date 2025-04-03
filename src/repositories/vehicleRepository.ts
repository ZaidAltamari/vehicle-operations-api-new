// src/repositories/vehicleTypeRepository.ts
import { PrismaClient, VehicleType } from '@prisma/client';
import { CreateVehicleTypeInput } from '../validators/vehicleTypeValidator';

export class VehicleTypeRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async create(data: CreateVehicleTypeInput): Promise<VehicleType> {
		try {
			return await this.prisma.vehicleType.create({
				data,
			});
		} catch (error) {
			throw error;
		}
	}

	async findAll(): Promise<VehicleType[]> {
		try {
			return await this.prisma.vehicleType.findMany();
		} catch (error) {
			throw error;
		}
	}

	async findById(id: string): Promise<VehicleType | null> {
		try {
			return await this.prisma.vehicleType.findUnique({
				where: { id },
			});
		} catch (error) {
			throw error;
		}
	}

	async update(
		id: string,
		data: CreateVehicleTypeInput,
	): Promise<VehicleType | null> {
		try {
			return await this.prisma.vehicleType.update({
				where: { id },
				data,
			});
		} catch (error) {
			throw error;
		}
	}

	async delete(id: string): Promise<VehicleType | null> {
		try {
			// Check if vehicle type is used in allocations or schedules
			const allocationsCount = await this.prisma.vehicleAllocation.count({
				where: { vehicleTypeId: id },
			});

			const schedulesCount = await this.prisma.schedule.count({
				where: { vehicleTypeId: id },
			});

			if (allocationsCount > 0 || schedulesCount > 0) {
				throw new Error('Cannot delete vehicle type that is in use');
			}

			return await this.prisma.vehicleType.delete({
				where: { id },
			});
		} catch (error) {
			throw error;
		}
	}
}
