import mongodb from 'mongodb';
import dotenv from 'dotenv';
import app from './src/server.js';
import EventsDAO from './dao/eventsDAO.js';

/**
 * Main function that initializes environment variables, connects to MongoDB,
 * injects the database handle into the DAO, and starts the server.
 *
 * @returns {Promise<void>}
 */
async function main () {
    dotenv.config();

    const client = new mongodb.MongoClient(
        process.env.VOLLEYBALL_DB_URI,
    );
    const port = process.env.PORT || 8000;

    try {
        // Connect to MongoDB server
        await client.connect();
        await EventsDAO.injectDB(client);

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (e) {
        console.error(`Unable to connect to database: ${e}`);
        process.exit(1);
    }
}

main().catch(console.error);

/**
 * Export the Express app for testing purposes.
 */
export default app;