// src/validators/routeValidator.ts
import { z } from 'zod';

const createRouteSchema = z.object({
  source: z.string().min(1, "Source is required"),
  destination: z.string().min(1, "Destination is required"),
  distance: z.number().positive("Distance must be positive"),
  estimatedDuration: z.number().int().positive("Duration must be a positive integer")
});

export type CreateRouteInput = z.infer<typeof createRouteSchema>;

export const validateRoute = (data: unknown): CreateRouteInput => {
  return createRouteSchema.parse(data);
};
