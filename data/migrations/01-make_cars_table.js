exports.up = function (knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments()
    tbl.text('vin', 17).unique().notNullable()
    tbl.text('make', 66).notNullable()
    tbl.text('model', 66).notNullable()
    tbl.float('mileage').notNullable()
    tbl.text('title', 32)
    tbl.text('transmission', 40)
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars')
};
