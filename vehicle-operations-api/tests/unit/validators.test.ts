// tests/unit/validators.test.ts
import { validateOperation } from '../../src/validators/operationValidator';
import { validateRoute } from '../../src/validators/routeValidator';
import { validateVehicleType } from '../../src/validators/vehicleTypeValidator';
import { describe, test, expect } from '@jest/globals';

describe('Validators', () => {
	describe('Operation Validator', () => {
		test('should validate a valid operation', () => {
			const validOperation = {
				name: 'Test Operation',
				startDate: new Date().toISOString(),
				endDate: new Date(Date.now() + 86400000).toISOString(),
				status: 'planned',
			};

			const result = validateOperation(validOperation);
			expect(result).toEqual(validOperation);
		});

		test('should throw error for invalid operation', () => {
			const invalidOperation = {
				// Missing name
				startDate: new Date().toISOString(),
				endDate: new Date(Date.now() + 86400000).toISOString(),
			};

			expect(() => validateOperation(invalidOperation)).toThrow();
		});
	});

	describe('Route Validator', () => {
		test('should validate a valid route', () => {
			const validRoute = {
				source: 'City A',
				destination: 'City B',
				distance: 150.5,
				estimatedDuration: 180,
			};

			const result = validateRoute(validRoute);
			expect(result).toEqual(validRoute);
		});

		test('should throw error for invalid route', () => {
			const invalidRoute = {
				source: 'City A',
				destination: 'City B',
				distance: -10, // Negative distance
				estimatedDuration: 180,
			};

			expect(() => validateRoute(invalidRoute)).toThrow();
		});
	});

	describe('Vehicle Type Validator', () => {
		test('should validate a valid vehicle type', () => {
			const validVehicleType = {
				name: 'Truck',
				capacity: 5,
			};

			const result = validateVehicleType(validVehicleType);
			expect(result).toEqual(validVehicleType);
		});

		test('should throw error for invalid vehicle type', () => {
			const invalidVehicleType = {
				name: 'Truck',
				capacity: 0, // Capacity must be positive
			};

			expect(() => validateVehicleType(invalidVehicleType)).toThrow();
		});
	});
});
