// src/services/routeService.ts
import { Route } from '@prisma/client';
import { CreateRouteInput } from '../validators/routeValidator';
import { RouteRepository } from '../repositories/routeRepository';

export class RouteService {
	private routeRepository: RouteRepository;

	constructor() {
		this.routeRepository = new RouteRepository();
	}

	async createRoute(data: CreateRouteInput): Promise<Route> {
		try {
			return await this.routeRepository.create(data);
		} catch (error) {
			throw error;
		}
	}

	async getRoutes(): Promise<Route[]> {
		try {
			return await this.routeRepository.findAll();
		} catch (error) {
			throw error;
		}
	}

	async getRouteById(id: string): Promise<Route | null> {
		try {
			return await this.routeRepository.findById(id);
		} catch (error) {
			throw error;
		}
	}

	async updateRoute(
		id: string,
		data: CreateRouteInput,
	): Promise<Route | null> {
		try {
			return await this.routeRepository.update(id, data);
		} catch (error) {
			throw error;
		}
	}

	async deleteRoute(id: string): Promise<Route | null> {
		try {
			return await this.routeRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}
}
