const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

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
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const date = Date()
    //console.log(date)
    const msg = `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
    response.send(msg)
})
  
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
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
    const existing = persons.find(p => p.name === body.name)
    if (existing) {
        response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)

    //console.log(person)
    response.json(person)
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})