// src/controllers/routeController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateRouteInput } from '../validators/routeValidator';
import { RouteService } from '../services/routeService';

export class RouteController {
	private routeService: RouteService;

	constructor() {
		this.routeService = new RouteService();
	}

	async createRoute(
		request: FastifyRequest<{ Body: CreateRouteInput }>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			if (
				!request.body ||
				!request.body.source ||
				!request.body.destination ||
				request.body.distance === undefined ||
				request.body.estimatedDuration === undefined
			) {
				return reply.code(400).send({
					error: 'Bad Request',
					message:
						'Route source, destination, distance, and estimated duration are required',
				});
			}

			const route = await this.routeService.createRoute(request.body);
			return reply.code(201).send(route);
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to create route',
				details: error instanceof Error ? error.message : 'Unknown error',
			});
		}
	}

	async getRoutes(
		_request: FastifyRequest,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			const routes = await this.routeService.getRoutes();
			return reply.code(200).send(routes);
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to retrieve routes',
			});
		}
	}

	async getRouteById(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			const route = await this.routeService.getRouteById(request.params.id);

			if (!route) {
				return reply.code(404).send({ message: 'Route not found' });
			}

			return reply.code(200).send(route);
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to retrieve route',
			});
		}
	}

	async updateRoute(
		request: FastifyRequest<{
			Params: { id: string };
			Body: CreateRouteInput;
		}>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			if (
				!request.body ||
				!request.body.source ||
				!request.body.destination ||
				request.body.distance === undefined ||
				request.body.estimatedDuration === undefined
			) {
				return reply.code(400).send({
					error: 'Bad Request',
					message:
						'Route source, destination, distance, and estimated duration are required',
				});
			}

			const route = await this.routeService.updateRoute(
				request.params.id,
				request.body,
			);

			if (!route) {
				return reply.code(404).send({ message: 'Route not found' });
			}

			return reply.code(200).send(route);
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to update route',
			});
		}
	}

	async deleteRoute(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		try {
			const deleted = await this.routeService.deleteRoute(request.params.id);

			if (!deleted) {
				return reply.code(404).send({ message: 'Route not found' });
			}

			return reply.code(204).send();
		} catch (error) {
			return reply.code(500).send({
				error: 'Internal Server Error',
				message: 'Failed to delete route',
				details: error instanceof Error ? error.message : 'Unknown error',
			});
		}
	}
}
