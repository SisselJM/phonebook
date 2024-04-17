require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

//also show the data sent in HTTP POST requests
morgan.token('req-body', (req) => {
    if (req.method === 'POST') {
      return JSON.stringify(req.body);
    }
    return '';
  });

app.use(morgan(':method :url :status :response-time ms - :req-body'))

app.use(cors())

app.use(express.json())
app.use(express.static('dist'))

let persons = [
]

app.get('/info', (request, response) => {
    const date = Date()
    //console.log(date)
    Person.find({}).then(persons => {
        console.log(persons.length)
        const msg = `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
        response.send(msg)
    })
})
  
app.get('/api/persons', (request, response) => {
    Person.find({}).then(ps => {
        response.json(ps)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
    .then(p => {
        response.json(p)
    })
})
  
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    //console.log(persons.length)
    persons = persons.filter(p => p.id !== id)
    //console.log(persons.length)
    response.status(204).end()
})

const generateId = () => {
    const id = Math.floor(Math.random() * 10000)
    console.log(id)
    return id
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    //console.log(body) 
    
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name and/or number missing'
        })
    }
    /*
    const existing = persons.find(p => p.name === body.name)
    if (existing) {
        response.status(400).json({
            error: 'name must be unique'
        })
    }*/

    const person = new Person({
        name: body.name,
        number: body.number,
        id: generateId(),
    })
    
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })

    //console.log(person)
    response.json(person)
})
  
const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})