exports.up = function(knex) {
    return knex.schema.createTable('observacoes', table => {
        table.increments('id').primary();
        table.text('observacao').notNullable(); // Assuming you want a text field for the observation
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('observacoes');
};
