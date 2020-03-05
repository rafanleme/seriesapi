const express = require('express')
const app = express()
const cors = require('cors')
const authMidd = require('./middlewares/auth')

app.use(express.json())

app.use('/fotos', express.static('fotos'))

app.use(cors())

// let alowCrossDomain = (req,res,next) => {
//     console.log(req.headers)
//     res.header('Access-Control-Allow-Origin','http://localhost:3001')
//     res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
//     res.header('Access-Control-Allow-Headers','*')
//     res.header('Access-Control-Allow-Credentials','true')
//     next()
// }

// app.use(alowCrossDomain)

const auth = require('./routes/authRoutes')
const series = require('./routes/seriesRoutes')
const generos = require('./routes/generosRoutes')

app.use('/auth', auth)

app.use(authMidd)

app.use('/series', series)
app.use('/generos', generos)

module.exports = app