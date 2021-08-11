const express = require("express")

const carsRouter = require('./cars/cars-router')

const server = express()

server.use(express.json())

server.use('/api/cars', carsRouter)

server.use('*', (req, res) => {
  res.send('well, at least the most basic functions of this api are working...?')
})

module.exports = server
