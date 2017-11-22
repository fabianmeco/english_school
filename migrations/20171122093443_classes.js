
exports.up = function(knex, Promise) {
  return knex.schema.createTable('classes', function(clss){
    clss.increments('id').primary();
    clss.dateTime('date').notNull();
    clss.integer('teacher_id').notNull(); //just can have one teacher for each class
    clss.foreign('teacher_id').references('teachers.id');
    clss.integer('room_id').notNull();
    clss.foreign('room_id').references('rooms.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('classes');
};
