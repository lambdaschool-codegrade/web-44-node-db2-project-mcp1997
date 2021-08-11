const express = require('express')

const Cars = require('./cars-model')

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

router.get('/:id', (req, res, next) => {
  Cars.getById(req.params.id)
})

router.get('/', (req, res, next) => {
  Cars.create(req.body)
})

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})


module.exports = router
