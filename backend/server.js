import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = process.env.PORT || 5000

// Enable CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => {
    res.send('HELLLOOO')
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    res.json(products.find(product => product._id === req.params.id))
})

app.listen(port, () => console.log(`listening to port: ${port}`))