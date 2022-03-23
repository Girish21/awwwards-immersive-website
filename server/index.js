const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const path = require('path')

const app = express()

const PORT = 3000

app.disable('x-powered-by')

app.use(express.static('public'))

app.use(compression())

app.use(morgan('tiny'))

app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'pug')

app.get('/', (_, res) => {
  res.set('Content-Type', 'text/html; charset=utf-8')
  res.set('Cache-Control', 'max-age=5')
  res.status(200)
  res.render('pages/home')
})

app.get('/about', (_, res) => {
  res.set('Content-Type', 'text/html; charset=utf-8')
  res.set('Cache-Control', 'max-age=5')
  res.status(200)
  res.render('pages/about')
})

app.get('/collection', (_, res) => {
  res.set('Content-Type', 'text/html; charset=utf-8')
  res.set('Cache-Control', 'max-age=5')
  res.status(200)
  res.render('pages/collections')
})

app.get('/detail/:id', (_, res) => {
  res.set('Content-Type', 'text/html; charset=utf-8')
  res.set('Cache-Control', 'max-age=5')
  res.status(200)
  res.render('pages/detail')
})

app.listen(PORT, () => {
  console.log(`🚀 App listening on port ${PORT}`)
})
