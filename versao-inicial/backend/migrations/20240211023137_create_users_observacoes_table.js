exports.up = function(knex) {
    return knex.schema.createTable('users_observacoes', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.integer('observacao_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id').onDelete('CASCADE');
        table.foreign('observacao_id').references('observacoes.id').onDelete('CASCADE');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users_observacoes');
};
