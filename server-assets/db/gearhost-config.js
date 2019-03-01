let mongoose = require('mongoose')
let connectionString = 'mongodb://fetchit:fetchTheWorld!@den1.mongo1.gear.host:27001/fetchit'
let connection = mongoose.connection

mongoose.connect(connectionString, {
  useNewUrlParser: true
})

connection.on('error', err => {
  console.log('[DATABASE ERROR]: ', err)
})

connection.once('open', () => console.log('connected to the database!'))