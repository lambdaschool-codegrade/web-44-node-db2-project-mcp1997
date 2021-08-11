const db = require('../../data/db-config')

const getAll = async () => {
  return db('cars')
}

const getById = async (id) => {
  return db('cars').where('id', id).first()
}

const create = async (car) => {
  const [id] = await db('cars').insert(car)
  const newCar = await getById(id)
  return newCar
}

module.exports = {
  getAll,
  getById,
  create
}
