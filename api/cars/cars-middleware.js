const db = require('../../data/db-config')

const vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
  const existingID = await db('cars').where('id', req.params.id).first()
  if (!existingID) {
    res.status(404).json({
      message: `car with id ${req.params.id} is not found`
    })
  } else {
    next()
  }
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body
  if (!vin) {
    res.status(400).json({
      message: 'vin is missing'
    })
  } else if (!make) {
    res.status(400).json({
      message: 'make is missing'
    })
  } else if (!model) {
    res.status(400).json({
      message: 'model is missing'
    })
  } else if (!mileage) {
    res.status(400).json({
      message: 'mileage is missing'
    })
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body
  if (vinValidator.validate(vin)) {
    next()
  } else {
    res.status(400).json({
      message: `vin ${vin} is invalid`
    })
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const existingVin = await db('cars').where('vin', req.body.vin).first()
  if (existingVin) {
    res.status(400).json({
      message: `vin ${req.body.vin} already exists`
    })
  } else {
    next()
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
