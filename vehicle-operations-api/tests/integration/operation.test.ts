// tests/integration/operation.test.ts
import { app, prisma } from '../../src/setup';
import { describe, test, expect, afterAll } from '@jest/globals';

describe('Operation API', () => {
	const testOperation = {
		name: `Test Operation ${Date.now()}`,
		startDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
		endDate: new Date(Date.now() + 86400000 * 7).toISOString(), // Next week
		status: 'planned',
	};

	let operationId: string;

	// Clean up after tests
	afterAll(async () => {
		if (operationId) {
			try {
				await prisma.vehicleOperation.delete({
					where: { id: operationId },
				});
			} catch (error) {
				console.log('Cleanup error:', error);
			}
		}
	});

	test('should create a new operation', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/api/operations',
			payload: testOperation,
		});

		expect(response.statusCode).toBe(201);
		const body = JSON.parse(response.body);
		expect(body.name).toBe(testOperation.name);
		expect(body.status).toBe(testOperation.status);
		operationId = body.id;
	});

	test('should get all operations', async () => {
		const response = await app.inject({
			method: 'GET',
			url: '/api/operations',
		});

		expect(response.statusCode).toBe(200);
		const body = JSON.parse(response.body);
		expect(Array.isArray(body)).toBe(true);
	});

	test('should get operation by ID', async () => {
		if (!operationId) {
			throw new Error('Operation ID not available');
		}

		const response = await app.inject({
			method: 'GET',
			url: `/api/operations/${operationId}`,
		});

		expect(response.statusCode).toBe(200);
		const body = JSON.parse(response.body);
		expect(body.id).toBe(operationId);
		expect(body.name).toBe(testOperation.name);
	});

	test('should update operation', async () => {
		if (!operationId) {
			throw new Error('Operation ID not available');
		}

		const updatedData = {
			name: `Updated Operation ${Date.now()}`,
			startDate: new Date(Date.now() + 86400000).toISOString(),
			endDate: new Date(Date.now() + 86400000 * 14).toISOString(),
			status: 'active',
		};

		const response = await app.inject({
			method: 'PUT',
			url: `/api/operations/${operationId}`,
			payload: updatedData,
		});

		expect(response.statusCode).toBe(200);
		const body = JSON.parse(response.body);
		expect(body.name).toBe(updatedData.name);
		expect(body.status).toBe(updatedData.status);
	});

	test('should update operation status', async () => {
		if (!operationId) {
			throw new Error('Operation ID not available');
		}

		const statusUpdate = {
			status: 'completed',
		};

		const response = await app.inject({
			method: 'PATCH',
			url: `/api/operations/${operationId}/status`,
			payload: statusUpdate,
		});

		expect(response.statusCode).toBe(200);
		const body = JSON.parse(response.body);
		expect(body.status).toBe(statusUpdate.status);
	});

	test('should delete operation', async () => {
		if (!operationId) {
			throw new Error('Operation ID not available');
		}

		const response = await app.inject({
			method: 'DELETE',
			url: `/api/operations/${operationId}`,
		});

		expect(response.statusCode).toBe(204);

		// Verify it's deleted
		const getResponse = await app.inject({
			method: 'GET',
			url: `/api/operations/${operationId}`,
		});

		expect(getResponse.statusCode).toBe(404);

		// Prevent the afterAll handler from trying to delete again
		operationId = '';
	});
});
