const mongoose = require('mongoose')

//getAll: node mongo.js psw 
//add: node mongo.js psw name number

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

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        //console.log(result)
        result.map((p) => {
            console.log(`${p.name} ${p.number}`)
        })
        mongoose.connection.close()
      })

    return
}

if (process.argv.length<5) {
    console.log('give name and number')
    process.exit(1)
}
const name = process.argv[3]
const number = process.argv[4]
const id = Math.floor(Math.random() * 10000)
console.log(`${name} ${number} ${id}`)

const person = new Person({
    "id": id,
    "name": name, 
    "number": number,
})

person.save().then(result => {
  console.log(`Added ${name} number ${number} to phonebook`)
  //console.log(result)
  mongoose.connection.close()
})