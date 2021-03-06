const express = require('express');
const config = require('config');
const mongoose = require('mongoose')


const app = express();

app.use(express.json({ extended: true }))

const PORT = config.get('port') || 5000

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/links', require('./routes/links.routes'))
app.use('/t', require('./routes/redirect.routes'))

async function start () {
    try{
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    } catch (e){
        console.log('Server error ',e.mmessage )
        process.exit(1) //?
    }
}

start();

app.listen(PORT, () => {console.log(`App has been started on port ${PORT} ...`)})