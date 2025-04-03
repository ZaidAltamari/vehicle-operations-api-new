// tests/app.test.ts
import { describe, test, expect } from '@jest/globals';
import { build } from '../src/app';

describe('App', () => {
	test('should build the application without errors', async () => {
		const app = build();
		expect(app).toBeDefined();

		// Need to wait for routes to be registered
		await app.ready();

		// Now check that routes exist
		expect(
			app.hasRoute({
				method: 'GET',
				url: '/api/operations',
			}),
		).toBe(true);

		expect(
			app.hasRoute({
				method: 'GET',
				url: '/api/routes',
			}),
		).toBe(true);

		expect(
			app.hasRoute({
				method: 'GET',
				url: '/api/schedules',
			}),
		).toBe(true);

		expect(
			app.hasRoute({
				method: 'GET',
				url: '/api/vehicles',
			}),
		).toBe(true);

		// Clean up
		await app.close();
	});
});
