
exports.up = function(knex, Promise) {
  return knex.schema.createTable('rooms', function(room){
      room.increments('id').primary();
      room.string('name').notNull();
      room.integer('capacity').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rooms');
};
