// tests/integration/vehicleAllocation.test.ts
import { app, prisma } from '../../src/setup';
import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';

describe('Vehicle Allocation API', () => {
	let vehicleTypeId: string;
	let operationId: string;
	let allocationId: string;

	// Setup test data before tests
	beforeAll(async () => {
		// Create a vehicle type
		const vehicleType = await prisma.vehicleType.create({
			data: {
				name: `Test Vehicle Type ${Date.now()}`,
				capacity: 5,
			},
		});
		vehicleTypeId = vehicleType.id;

		// Create an operation
		const operation = await prisma.vehicleOperation.create({
			data: {
				name: `Test Operation ${Date.now()}`,
				startDate: new Date(Date.now() + 86400000),
				endDate: new Date(Date.now() + 86400000 * 7),
				status: 'planned',
			},
		});
		operationId = operation.id;
	});

	// Clean up after tests
	afterAll(async () => {
		if (allocationId) {
			try {
				await prisma.vehicleAllocation.delete({
					where: { id: allocationId },
				});
			} catch (error) {
				console.log('Allocation cleanup error:', error);
			}
		}

		if (operationId) {
			try {
				await prisma.vehicleOperation.delete({
					where: { id: operationId },
				});
			} catch (error) {
				console.log('Operation cleanup error:', error);
			}
		}

		if (vehicleTypeId) {
			try {
				await prisma.vehicleType.delete({
					where: { id: vehicleTypeId },
				});
			} catch (error) {
				console.log('Vehicle type cleanup error:', error);
			}
		}
	});

	test('should create a new vehicle allocation with description', async () => {
		const testAllocation = {
			operationId,
			vehicleTypeId,
			quantity: 5,
			description: 'Test allocation description',
		};

		const response = await app.inject({
			method: 'POST',
			url: '/api/allocations',
			payload: testAllocation,
		});

		expect(response.statusCode).toBe(201);
		const body = JSON.parse(response.body);
		expect(body.operationId).toBe(operationId);
		expect(body.vehicleTypeId).toBe(vehicleTypeId);
		expect(body.quantity).toBe(testAllocation.quantity);
		expect(body.description).toBe(testAllocation.description);
		allocationId = body.id;
	});

	test('should get all vehicle allocations', async () => {
		const response = await app.inject({
			method: 'GET',
			url: '/api/allocations',
		});

		expect(response.statusCode).toBe(200);
		const body = JSON.parse(response.body);
		expect(Array.isArray(body)).toBe(true);
	});

	test('should get vehicle allocation by ID', async () => {
		if (!allocationId) {
			throw new Error('Allocation ID not available');
		}

		const response = await app.inject({
			method: 'GET',
			url: `/api/allocations/${allocationId}`,
		});

		expect(response.statusCode).toBe(200);
		const body = JSON.parse(response.body);
		expect(body.id).toBe(allocationId);
		expect(body.description).toBe('Test allocation description');
	});

	test('should update vehicle allocation', async () => {
		if (!allocationId) {
			throw new Error('Allocation ID not available');
		}

		const updatedData = {
			operationId,
			vehicleTypeId,
			quantity: 10,
			description: 'Updated allocation description',
		};

		const response = await app.inject({
			method: 'PUT',
			url: `/api/allocations/${allocationId}`,
			payload: updatedData,
		});

		expect(response.statusCode).toBe(200);
		const body = JSON.parse(response.body);
		expect(body.quantity).toBe(updatedData.quantity);
		expect(body.description).toBe(updatedData.description);
	});

	test('should delete vehicle allocation', async () => {
		if (!allocationId) {
			throw new Error('Allocation ID not available');
		}

		const response = await app.inject({
			method: 'DELETE',
			url: `/api/allocations/${allocationId}`,
		});

		expect(response.statusCode).toBe(204);

		// Verify it's deleted
		const getResponse = await app.inject({
			method: 'GET',
			url: `/api/allocations/${allocationId}`,
		});

		expect(getResponse.statusCode).toBe(404);

		// Prevent the afterAll handler from trying to delete again
		allocationId = '';
	});
});
