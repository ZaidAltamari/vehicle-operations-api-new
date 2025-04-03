// tests/integration/schedule.test.ts
import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { app, prisma } from '../../src/setup';

describe('Schedule API', () => {
	// Test data setup
	let vehicleTypeId: string;
	let operationId: string;
	let routeId: string;
	let scheduleId: string;

	// Setup test data before tests
	beforeAll(async () => {
		// Create a vehicle type
		const vehicleType = await prisma.vehicleType.create({
			data: {
				name: `Test Vehicle ${Date.now()}`,
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

		// Create a route
		const route = await prisma.route.create({
			data: {
				source: `City A ${Date.now()}`,
				destination: `City B ${Date.now()}`,
				distance: 150.5,
				estimatedDuration: 180,
			},
		});
		routeId = route.id;
	});

	// Clean up after tests
	afterAll(async () => {
		// Clean up in reverse order to avoid foreign key constraint issues
		if (scheduleId) {
			try {
				await prisma.schedule.delete({
					where: { id: scheduleId },
				});
			} catch (error) {
				console.log('Schedule cleanup error:', error);
			}
		}

		if (routeId) {
			try {
				await prisma.route.delete({
					where: { id: routeId },
				});
			} catch (error) {
				console.log('Route cleanup error:', error);
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

	test('should create a new schedule', async () => {
		const testSchedule = {
			operationId,
			vehicleTypeId,
			routeId,
			date: new Date(Date.now() + 86400000 * 2).toISOString(),
			startTime: new Date(
				Date.now() + 86400000 * 2 + 3600000 * 8,
			).toISOString(),
			endTime: new Date(
				Date.now() + 86400000 * 2 + 3600000 * 16,
			).toISOString(),
		};

		const response = await app.inject({
			method: 'POST',
			url: '/api/schedules',
			payload: testSchedule,
		});

		expect(response.statusCode).toBe(201);
		const body = JSON.parse(response.body);
		expect(body.operationId).toBe(operationId);
		expect(body.vehicleTypeId).toBe(vehicleTypeId);
		expect(body.routeId).toBe(routeId);
		scheduleId = body.id;
	});

	test('should get all schedules', async () => {
		const response = await app.inject({
			method: 'GET',
			url: '/api/schedules',
		});

		expect(response.statusCode).toBe(200);
		const body = JSON.parse(response.body);
		expect(Array.isArray(body)).toBe(true);
	});

	test('should get schedule by ID', async () => {
		if (!scheduleId) {
			throw new Error('Schedule ID not available');
		}

		const response = await app.inject({
			method: 'GET',
			url: `/api/schedules/${scheduleId}`,
		});

		expect(response.statusCode).toBe(200);
		const body = JSON.parse(response.body);
		expect(body.id).toBe(scheduleId);
		expect(body.operationId).toBe(operationId);
	});

	test('should get schedules by operation ID', async () => {
		const response = await app.inject({
			method: 'GET',
			url: `/api/schedules/operation/${operationId}`,
		});

		expect(response.statusCode).toBe(200);
		const body = JSON.parse(response.body);
		expect(Array.isArray(body)).toBe(true);
		expect(body.length).toBeGreaterThan(0);
		expect(body[0].operationId).toBe(operationId);
	});

	test('should update schedule', async () => {
		if (!scheduleId) {
			throw new Error('Schedule ID not available');
		}

		const updatedSchedule = {
			operationId,
			vehicleTypeId,
			routeId,
			date: new Date(Date.now() + 86400000 * 3).toISOString(),
			startTime: new Date(
				Date.now() + 86400000 * 3 + 3600000 * 9,
			).toISOString(),
			endTime: new Date(
				Date.now() + 86400000 * 3 + 3600000 * 17,
			).toISOString(),
		};

		const response = await app.inject({
			method: 'PUT',
			url: `/api/schedules/${scheduleId}`,
			payload: updatedSchedule,
		});

		expect(response.statusCode).toBe(200);
		const body = JSON.parse(response.body);
		expect(body.id).toBe(scheduleId);
		// Check date has been updated - can't directly compare ISO strings due to formatting
		const responseDate = new Date(body.date);
		const expectedDate = new Date(updatedSchedule.date);
		expect(responseDate.getDate()).toBe(expectedDate.getDate());
	});

	test('should delete schedule', async () => {
		if (!scheduleId) {
			throw new Error('Schedule ID not available');
		}

		const response = await app.inject({
			method: 'DELETE',
			url: `/api/schedules/${scheduleId}`,
		});

		expect(response.statusCode).toBe(204);

		// Verify it's deleted
		const getResponse = await app.inject({
			method: 'GET',
			url: `/api/schedules/${scheduleId}`,
		});

		expect(getResponse.statusCode).toBe(404);

		// Prevent the afterAll handler from trying to delete again
		scheduleId = '';
	});
});
