import express from 'express'

const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send('HELLLOOO')
})

app.listen(port, () => console.log(`listening to port: ${port}`))