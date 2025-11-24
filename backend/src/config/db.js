const knex = require('knex');
const path = require('path');

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, '../../database.sqlite')
    },
    useNullAsDefault: true
});

// Initialize database schema if not exists
const initDatabase = async () => {
    const hasTable = await db.schema.hasTable('torneos');
    if (!hasTable) {
        await db.schema.createTable('torneos', (table) => {
            table.increments('id').primary();
            table.string('nombre').notNullable().unique();
            table.string('categoria');
            table.string('archivo');
            table.timestamps(true, true);
        });
        console.log('Database table "torneos" created');
    }
};

initDatabase().catch(console.error);

module.exports = db;
