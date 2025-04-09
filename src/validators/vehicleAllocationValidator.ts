// src/validators/vehicleAllocationValidator.ts
import { z } from 'zod';

const createVehicleAllocationSchema = z.object({
	operationId: z.string().uuid('Invalid operation ID'),
	vehicleTypeId: z.string().uuid('Invalid vehicle type ID'),
	quantity: z.number().int().positive('Quantity must be a positive integer'),
	description: z.string().optional(),
});

export type CreateVehicleAllocationInput = z.infer<
	typeof createVehicleAllocationSchema
>;

export const validateVehicleAllocation = (
	data: unknown,
): CreateVehicleAllocationInput => {
	return createVehicleAllocationSchema.parse(data);
};
