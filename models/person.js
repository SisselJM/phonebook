const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

//TODO process.env.MONGODB_URI
const password = process.argv[2]
const url = `mongodb+srv://sisselmannsaker:${password}@cluster0.qw9f45v.mongodb.net/phonebook?retryWrites=true&w=majority`

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    id: Number,
    name: String, 
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
