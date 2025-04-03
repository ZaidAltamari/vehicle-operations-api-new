// src/validators/operationValidator.ts
import { z } from 'zod';

const createOperationSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	startDate: z.string().or(z.date()),
	endDate: z.string().or(z.date()),
	status: z.string().optional().default('planned'),
});

export type CreateOperationInput = z.infer<typeof createOperationSchema>;

export const validateOperation = (data: unknown): CreateOperationInput => {
	return createOperationSchema.parse(data);
};
