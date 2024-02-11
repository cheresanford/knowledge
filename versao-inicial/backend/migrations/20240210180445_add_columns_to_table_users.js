
exports.up = function(knex, Promise) {
    return knex.schema.table('users', table => {
        table.renameColumn('name', 'nickname');
        table.string('passwd');
        table.string('email_passwd');
        table.string('link_g2g');
        table.string('link_eldorado');
        table.string('link_playerauctions');
    })
};

exports.down = function(knex, Promise) {
    table.renameColumn('nickname', 'name');
};
