// src/validators/scheduleValidator.ts
import { z } from 'zod';

const createScheduleSchema = z.object({
	operationId: z.string().uuid('Invalid operation ID'),
	vehicleTypeId: z.string().uuid('Invalid vehicle type ID'),
	routeId: z.string().uuid('Invalid route ID'),
	date: z.string().or(z.date()),
	startTime: z.string().or(z.date()),
	endTime: z.string().or(z.date()),
});

export type CreateScheduleInput = z.infer<typeof createScheduleSchema>;

export const validateSchedule = (data: unknown): CreateScheduleInput => {
	return createScheduleSchema.parse(data);
};
