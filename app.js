const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  res.send('redirect to /restaurants and listing options')
})

// :id的意思就是產生一個key為id、value為輸入變數的pair存在object裡，結果為{ id: 輸入變數值 }，所以可以用來設計動態路由
app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id
  res.send(`read restaurant: ${id}`)
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})