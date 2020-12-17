const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth',require('./routes/auth.routes'))
app.use('/api/film',require('./routes/film.routes'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const PORT = config.get('port') || 5000

async function start(){
    try{
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT,() => console.log(`App started on port ${PORT}....`))
    }catch (e){
        console.log('Server ERROR:', e.message)
        process.exit(1)
    }
}

start()


