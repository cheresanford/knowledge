module.exports = {
    client: 'postgresql',
    connection: {
        host: 'curso-db', // Use the container name as the host
        database: 'mydb',
        user: 'postgres',
        password: 'password',
        port: 5432 // Default PostgreSQL port, adjust if you're using a different one
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};
