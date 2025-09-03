
const express = require('express')
const app = express()
const {connectToDataBase} = require('./Connection')
const SingUprouter = require('./Routes/SIgnUpRoutes')

app.use(express.json());

// Connection To DataBase
connectToDataBase()

// SignUP Router
app.use(SingUprouter)


app.listen(3000,() => console.log(`Server running at 3000`))