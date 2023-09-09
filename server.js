const express = require('express')
const mysql = require('mysql');
const myconn = require('express-myconnection');
const cors = require('cors')

const routes = require('./routes')

const app = express()

app.set('port', process.env.PORT || 3000)
 

const dbOptions = {

    host: 'localhost',
    port: '3306',
    user: 'root',   
    password: '123456',
    database: 'Actividad2'

}

app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
app.use(cors())

//routes-------------------------
app.get('/', (req, res) => {

    res.send('Welcome to my API');

})


app.use('/api', routes)

// server running----------------------------
app.listen(app.get('port'), () => {

    console.log('Server running on port', app.get('port'))

})
