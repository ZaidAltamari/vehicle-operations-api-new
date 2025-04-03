// src/validators/vehicleTypeValidator.ts
import { z } from 'zod';

const createVehicleTypeSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	capacity: z.number().int().positive('Capacity must be a positive integer'),
});

export type CreateVehicleTypeInput = z.infer<typeof createVehicleTypeSchema>;

export const validateVehicleType = (data: unknown): CreateVehicleTypeInput => {
	return createVehicleTypeSchema.parse(data);
};
