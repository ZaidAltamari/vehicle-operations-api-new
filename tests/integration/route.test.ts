import { app, prisma } from '../../src/setup';
import { describe, test, expect, afterAll } from '@jest/globals';
describe('Route API', () => {
	const testRoute = {
		source: `City A ${Date.now()}`,
		destination: `City B ${Date.now()}`,
		distance: 150.5,
		estimatedDuration: 180,
	};

	let routeId: string;

	// Clean up after tests
	afterAll(async () => {
		if (routeId) {
			try {
				await prisma.route.delete({
					where: { id: routeId },
				});
			} catch (error) {
				console.log('Cleanup error:', error);
			}
		}
	});

	test('should create a new route', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/api/routes',
			payload: testRoute,
		});

		expect(response.statusCode).toBe(201);
		const body = JSON.parse(response.body);
		expect(body.source).toBe(testRoute.source);
		expect(body.destination).toBe(testRoute.destination);
		expect(body.distance).toBe(testRoute.distance);
		expect(body.estimatedDuration).toBe(testRoute.estimatedDuration);
		routeId = body.id;
	});

	test('should get all routes', async () => {
		const response = await app.inject({
			method: 'GET',
			url: '/api/routes',
		});

		expect(response.statusCode).toBe(200);
		const body = JSON.parse(response.body);
		expect(Array.isArray(body)).toBe(true);
	});

	test('should get route by ID', async () => {
		if (!routeId) {
			throw new Error('Route ID not available');
		}

		const response = await app.inject({
			method: 'GET',
			url: `/api/routes/${routeId}`,
		});

		expect(response.statusCode).toBe(200);
		const body = JSON.parse(response.body);
		expect(body.id).toBe(routeId);
		expect(body.source).toBe(testRoute.source);
		expect(body.destination).toBe(testRoute.destination);
	});

	test('should update route', async () => {
		if (!routeId) {
			throw new Error('Route ID not available');
		}

		const updatedData = {
			source: `Updated City A ${Date.now()}`,
			destination: `Updated City B ${Date.now()}`,
			distance: 200.5,
			estimatedDuration: 240,
		};

		const response = await app.inject({
			method: 'PUT',
			url: `/api/routes/${routeId}`,
			payload: updatedData,
		});

		expect(response.statusCode).toBe(200);
		const body = JSON.parse(response.body);
		expect(body.source).toBe(updatedData.source);
		expect(body.destination).toBe(updatedData.destination);
		expect(body.distance).toBe(updatedData.distance);
		expect(body.estimatedDuration).toBe(updatedData.estimatedDuration);
	});

	test('should delete route', async () => {
		if (!routeId) {
			throw new Error('Route ID not available');
		}

		const response = await app.inject({
			method: 'DELETE',
			url: `/api/routes/${routeId}`,
		});

		expect(response.statusCode).toBe(204);

		// Verify it's deleted
		const getResponse = await app.inject({
			method: 'GET',
			url: `/api/routes/${routeId}`,
		});

		expect(getResponse.statusCode).toBe(404);

		// Prevent the afterAll handler from trying to delete again
		routeId = '';
	});
});
