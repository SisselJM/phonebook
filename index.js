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

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(p => {
        if (p) {
            response.json(p)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })
  
app.post('/api/persons', (request, response, next) => {
    const body = request.body
    //console.log(body) 
    
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
    })
    
    person.save()
    .then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    //console.log(request)
    const body = request.body
    const person = {
        name: body.name,
        number: body.number,
    }
    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
      .then(updated => {
        response.json(updated)
      })
      .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } 
  
    next(error) // 500 Internal Server Error
}
  
// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})