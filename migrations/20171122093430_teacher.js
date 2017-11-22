
exports.up = function(knex, Promise) {
    return knex.schema.createTable('teachers', function(teacher){
        teacher.increments('id').primary();
        teacher.string('fullname').notNull();
        teacher.string('cid').notNull(); //cid -> Teachers's personal Id.
        teacher.dateTime('birthday').notNull();
        teacher.string('phone_number').notNull();
        teacher.string('email').notNull();
        teacher.string('address').notNull();
      });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('teachers');
};
