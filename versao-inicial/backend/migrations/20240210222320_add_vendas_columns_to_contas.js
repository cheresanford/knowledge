
exports.up = function(knex, Promise) {
    return knex.schema.table('users', table => {
        table.boolean('isVendida').default(false);
        table.date('data_venda').default(null);
    })
};

exports.down = function(knex, Promise) {
    table.dropColumn('isVendida');
    table.dropColumn('data_venda');
};
