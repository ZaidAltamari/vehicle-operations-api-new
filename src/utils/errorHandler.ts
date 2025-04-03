// src/utils/errorHandler.ts
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export function errorHandler(
	error: FastifyError,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	// Log the error
	request.log.error(error);

	// Handle different types of errors
	if (error.statusCode) {
		return reply.status(error.statusCode).send({
			error: error.name,
			message: error.message,
		});
	}

	// Prisma errors
	if (error.name === 'PrismaClientKnownRequestError') {
		if ((error as any).code === 'P2002') {
			return reply.status(409).send({
				error: 'Conflict',
				message: 'A record with this data already exists',
			});
		}
		if ((error as any).code === 'P2025') {
			return reply.status(404).send({
				error: 'Not Found',
				message: 'Record not found',
			});
		}
	}

	// Validation errors
	if (error.name === 'ZodError') {
		return reply.status(400).send({
			error: 'Validation Error',
			message: error.message,
		});
	}

	// Default to 500 for unhandled errors
	return reply.status(500).send({
		error: 'Internal Server Error',
		message: 'An unexpected error occurred',
	});
}
