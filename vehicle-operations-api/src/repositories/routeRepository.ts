// src/repositories/routeRepository.ts
import { PrismaClient, Route } from '@prisma/client';
import { CreateRouteInput } from '../validators/routeValidator';

export class RouteRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async create(data: CreateRouteInput): Promise<Route> {
		try {
			return await this.prisma.route.create({
				data,
			});
		} catch (error) {
			throw error;
		}
	}

	async findAll(): Promise<Route[]> {
		try {
			return await this.prisma.route.findMany();
		} catch (error) {
			throw error;
		}
	}

	async findById(id: string): Promise<Route | null> {
		try {
			return await this.prisma.route.findUnique({
				where: { id },
			});
		} catch (error) {
			throw error;
		}
	}

	async update(id: string, data: CreateRouteInput): Promise<Route> {
		try {
			return await this.prisma.route.update({
				where: { id },
				data,
			});
		} catch (error) {
			throw error;
		}
	}

	async delete(id: string): Promise<Route> {
		try {
			// Check if route is used in any schedules
			const scheduleCount = await this.prisma.schedule.count({
				where: { routeId: id },
			});

			if (scheduleCount > 0) {
				throw new Error('Cannot delete route that is used in schedules');
			}

			return await this.prisma.route.delete({
				where: { id },
			});
		} catch (error) {
			throw error;
		}
	}
}
