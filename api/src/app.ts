import express from 'express'

const app = express()

app.get('/', (_req, res) => {
  res.send('HOLA')
})

app.use(express.json())

export default app
