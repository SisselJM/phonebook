const mongoose = require('mongoose')

//test run: node mongo.js psw

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://sisselmannsaker:${password}@cluster0.qw9f45v.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    id: Number,
    name: String, 
    number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    "id": 4,
    "name": "Mongo Db", 
    "number": "123-123456",
})

person.save().then(result => {
  console.log('person saved!')
  console.log(result)
  mongoose.connection.close()
})