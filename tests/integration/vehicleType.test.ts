// tests/integration/vehicleType.test.ts
import { app, prisma } from '../../src/setup';

// Remove beforeAll since it's not used
import { describe, test, expect, afterAll } from '@jest/globals';

describe('Vehicle Type API', () => {
	const testVehicleType = {
		name: `Test Vehicle ${Date.now()}`,
		capacity: 5,
	};

	let vehicleTypeId: string;

	// Clean up after tests
	afterAll(async () => {
		if (vehicleTypeId) {
			try {
				await prisma.vehicleType.delete({
					where: { id: vehicleTypeId },
				});
			} catch (error) {
				console.log('Cleanup error:', error);
			}
		}
	});

	test('should create a new vehicle type', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/api/vehicles',
			payload: testVehicleType,
		});

		expect(response.statusCode).toBe(201);
		const body = JSON.parse(response.body);
		expect(body.name).toBe(testVehicleType.name);
		expect(body.capacity).toBe(testVehicleType.capacity);
		vehicleTypeId = body.id;
	});

	test('should get all vehicle types', async () => {
		const response = await app.inject({
			method: 'GET',
			url: '/api/vehicles',
		});

		expect(response.statusCode).toBe(200);
		const body = JSON.parse(response.body);
		expect(Array.isArray(body)).toBe(true);
	});

	test('should get vehicle type by ID', async () => {
		if (!vehicleTypeId) {
			throw new Error('Vehicle Type ID not available');
		}

		const response = await app.inject({
			method: 'GET',
			url: `/api/vehicles/${vehicleTypeId}`,
		});

		expect(response.statusCode).toBe(200);
		const body = JSON.parse(response.body);
		expect(body.id).toBe(vehicleTypeId);
		expect(body.name).toBe(testVehicleType.name);
	});

	test('should update vehicle type', async () => {
		if (!vehicleTypeId) {
			throw new Error('Vehicle Type ID not available');
		}

		const updatedData = {
			name: `Updated Vehicle ${Date.now()}`,
			capacity: 10,
		};

		const response = await app.inject({
			method: 'PUT',
			url: `/api/vehicles/${vehicleTypeId}`,
			payload: updatedData,
		});

		expect(response.statusCode).toBe(200);
		const body = JSON.parse(response.body);
		expect(body.name).toBe(updatedData.name);
		expect(body.capacity).toBe(updatedData.capacity);
	});

	test('should delete vehicle type', async () => {
		if (!vehicleTypeId) {
			throw new Error('Vehicle Type ID not available');
		}

		const response = await app.inject({
			method: 'DELETE',
			url: `/api/vehicles/${vehicleTypeId}`,
		});

		expect(response.statusCode).toBe(204);

		// Verify it's deleted
		const getResponse = await app.inject({
			method: 'GET',
			url: `/api/vehicles/${vehicleTypeId}`,
		});

		expect(getResponse.statusCode).toBe(404);

		// Prevent the afterAll handler from trying to delete again
		vehicleTypeId = '';
	});
});
