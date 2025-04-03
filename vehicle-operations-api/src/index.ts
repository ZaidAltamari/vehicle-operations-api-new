import { createServer } from './app';

const PORT = Number(process.env.PORT || 3000);

async function startServer() {
	try {
		const server = await createServer();

		await server.listen({
			port: PORT,
			host: '0.0.0.0',
		});

		server.log.info(`Server is running on port ${PORT}`);
	} catch (err) {
		console.error('Failed to start server', err);
		process.exit(1);
	}
}

startServer().catch((err) => {
	console.error('Unhandled error during server startup', err);
	process.exit(1);
});
