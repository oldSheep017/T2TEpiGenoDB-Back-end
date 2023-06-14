const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

const GeneRouter = require('./routes/gene')

app.use(cors())

// binding router
app.use('/gene', GeneRouter)

app.listen(port, () => {
	console.log('Hello')
})
