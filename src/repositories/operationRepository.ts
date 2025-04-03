// src/repositories/operationRepository.ts
import { PrismaClient, VehicleOperation } from '@prisma/client';
import { CreateOperationInput } from '../validators/operationValidator';

export class OperationRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async create(data: CreateOperationInput): Promise<VehicleOperation> {
		try {
			return await this.prisma.vehicleOperation.create({
				data: {
					name: data.name,
					startDate: new Date(data.startDate),
					endDate: new Date(data.endDate),
					status: data.status || 'planned',
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async findAll(): Promise<VehicleOperation[]> {
		try {
			return await this.prisma.vehicleOperation.findMany({
				include: {
					allocations: true,
					schedules: true,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async findById(id: string): Promise<VehicleOperation | null> {
		try {
			return await this.prisma.vehicleOperation.findUnique({
				where: { id },
				include: {
					allocations: true,
					schedules: true,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async update(
		id: string,
		data: CreateOperationInput,
	): Promise<VehicleOperation> {
		try {
			return await this.prisma.vehicleOperation.update({
				where: { id },
				data: {
					name: data.name,
					startDate: new Date(data.startDate),
					endDate: new Date(data.endDate),
					status: data.status,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async updateStatus(id: string, status: string): Promise<VehicleOperation> {
		try {
			return await this.prisma.vehicleOperation.update({
				where: { id },
				data: { status },
			});
		} catch (error) {
			throw error;
		}
	}

	async delete(id: string): Promise<VehicleOperation | null> {
		try {
			const operation = await this.prisma.vehicleOperation.findUnique({
				where: { id },
			});

			if (!operation) {
				return null;
			}

			// Delete related records first
			await this.prisma.vehicleAllocation.deleteMany({
				where: { operationId: id },
			});

			await this.prisma.schedule.deleteMany({
				where: { operationId: id },
			});

			return await this.prisma.vehicleOperation.delete({
				where: { id },
			});
		} catch (error) {
			throw error;
		}
	}
}
