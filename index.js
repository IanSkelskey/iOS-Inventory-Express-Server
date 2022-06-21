const express = require('express') // Import library express
const fs = require('fs') // Import fs
const app = express() // Invoking express
const port = 3000 // Set port
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


// List of requests
app.get('/sku', (req, res) => {
  console.log(req.query.sku)
  let data = fs.readFileSync('database.json')
  let skus = JSON.parse(data)
  console.log(skus[req.query.sku]['count'])
  res.send(skus[req.query.sku]['count'])
})

app.get('/skus', (req, res) => {
  let data = fs.readFileSync('database.json')
  let skus = JSON.parse(data)
  res.send(skus)
})

app.put('/sku', (req, res) => {
  console.log(req.query.sku)
  console.log(req.query.count)
  let newCount = req.query.count
  let data = fs.readFileSync('database.json')
  let skus = JSON.parse(data)
  skus[req.query.sku]['count'] = newCount
  fs.writeFileSync('database.json', JSON.stringify(skus))
  res.send('Updated count for SKU: ' + req.query.sku + '\nNew count: ' + newCount)
})

app.post('/skus', (req, res) => {
  console.log(JSON.stringify(req.body))
  fs.writeFileSync('database.json', JSON.stringify(req.body))
  let data = fs.readFileSync('database.json')
  let skus = JSON.parse(data)
  res.send(skus)
})

// Listen to specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
