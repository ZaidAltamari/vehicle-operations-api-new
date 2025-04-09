// src/repositories/vehicleAllocationRepository.ts
import { PrismaClient, VehicleAllocation } from '@prisma/client';
import { CreateVehicleAllocationInput } from '../validators/vehicleAllocationValidator';

export class VehicleAllocationRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async create(
		data: CreateVehicleAllocationInput,
	): Promise<VehicleAllocation> {
		try {
			return await this.prisma.vehicleAllocation.create({
				data,
				include: {
					operation: true,
					vehicleType: true,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async findAll(): Promise<VehicleAllocation[]> {
		try {
			return await this.prisma.vehicleAllocation.findMany({
				include: {
					operation: true,
					vehicleType: true,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async findById(id: string): Promise<VehicleAllocation | null> {
		try {
			return await this.prisma.vehicleAllocation.findUnique({
				where: { id },
				include: {
					operation: true,
					vehicleType: true,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async findByOperationId(operationId: string): Promise<VehicleAllocation[]> {
		try {
			return await this.prisma.vehicleAllocation.findMany({
				where: { operationId },
				include: {
					operation: true,
					vehicleType: true,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async update(
		id: string,
		data: CreateVehicleAllocationInput,
	): Promise<VehicleAllocation> {
		try {
			return await this.prisma.vehicleAllocation.update({
				where: { id },
				data,
				include: {
					operation: true,
					vehicleType: true,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async delete(id: string): Promise<VehicleAllocation> {
		try {
			return await this.prisma.vehicleAllocation.delete({
				where: { id },
			});
		} catch (error) {
			throw error;
		}
	}
}
