const express = require('express')

const Cars = require('./cars-model')

const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
} = require('./cars-middleware')

const router = express.Router()


router.get('/', (req, res, next) => {
  Cars.getAll()
    .then(cars => {
      if (!cars) {
        res.send([])
      } else {
        res.status(200).json(cars)
      }
    })
    .catch(next)
})

router.get('/:id', checkCarId, (req, res, next) => {
  Cars.getById(req.params.id)
    .then(car => {
      res.status(200).json(car)
    })
    .catch(next)
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
  Cars.create(req.body)
    .then(newCar => {
      res.status(201).json(newCar)
    })
    .catch(next)
})

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})


module.exports = router
