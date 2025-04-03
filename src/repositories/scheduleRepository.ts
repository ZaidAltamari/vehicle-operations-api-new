// src/repositories/scheduleRepository.ts
import { PrismaClient, Schedule } from '@prisma/client';
import { CreateScheduleInput } from '../validators/scheduleValidator';

export class ScheduleRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async create(data: CreateScheduleInput): Promise<Schedule> {
		try {
			return await this.prisma.schedule.create({
				data: {
					operationId: data.operationId,
					vehicleTypeId: data.vehicleTypeId,
					routeId: data.routeId,
					date: new Date(data.date),
					startTime: new Date(data.startTime),
					endTime: new Date(data.endTime),
				},
				include: {
					operation: true,
					vehicleType: true,
					route: true,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async findAll(): Promise<Schedule[]> {
		try {
			return await this.prisma.schedule.findMany({
				include: {
					operation: true,
					vehicleType: true,
					route: true,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async findById(id: string): Promise<Schedule | null> {
		try {
			return await this.prisma.schedule.findUnique({
				where: { id },
				include: {
					operation: true,
					vehicleType: true,
					route: true,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async findByOperationId(operationId: string): Promise<Schedule[]> {
		try {
			return await this.prisma.schedule.findMany({
				where: { operationId },
				include: {
					operation: true,
					vehicleType: true,
					route: true,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async update(id: string, data: CreateScheduleInput): Promise<Schedule> {
		try {
			return await this.prisma.schedule.update({
				where: { id },
				data: {
					operationId: data.operationId,
					vehicleTypeId: data.vehicleTypeId,
					routeId: data.routeId,
					date: new Date(data.date),
					startTime: new Date(data.startTime),
					endTime: new Date(data.endTime),
				},
				include: {
					operation: true,
					vehicleType: true,
					route: true,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async delete(id: string): Promise<Schedule> {
		try {
			return await this.prisma.schedule.delete({
				where: { id },
			});
		} catch (error) {
			throw error;
		}
	}
}
