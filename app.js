const mustacheExpress = require('mustache-express')
const express = require('express')
const app = express()

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', './views')
app.use('/public', express.static('public'))

app.get('/', (req,res) => {
  res.render('home')
})

app.get('/Home', (req,res) => {
  res.render('home')
})

app.get('/AboutUs', (req,res) => {
  res.render('aboutus')
})


app.listen(3000, () =>{
  console.log('We are live on channel 3000')
})
