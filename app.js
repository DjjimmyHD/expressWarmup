const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 9000
const people = require('./people')
const tada = '🎉' 

app.use(cors())
app.use(bodyParser.json())

const findPersonObject = (id,data) => {
    for(let i = 0; i < data.length; i++){
    let idString = i.toString()
        if(idString === id){
            return data[i]
        }
    }
    return null
}
// Look up response.json() express and see what it is doing
// How is it different than body.json() you're used to using?
app.get('/',(req,res,next) =>{

    return res.json({people})
})

app.get('/nope', (req,res,next) =>{
// try adding the above path to the url... what happened?
    res.redirect('/')
})

app.get('/tada',(req,res,next) => {
// try adding the above path to the url... what happened?    
    res.send(`<p>${tada}</p>`)
})

// Look into express routing and see if you can figure how these routes are able to be dynamic
app.get('/:id', (req,res,next) => {
// What in the heckin are req params?
    const person = findMatch(req.params.id, people)
// Since we are setting up the sever we get to handle the response errors however we want!
    if(!person){
// What are the different status codes that we have access to in the response?
        res.status = 404
        res.json({
            error: {
                message: "Couldnt find it yo"
            }
        })
    }
    res.json({ people: person })
})

app.listen(port, () =>{
    console.log(`we got you on port ${port}`)
})