const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')

// express.static is express build-in middleware function
// after app.use(express.static('public')), server could access to file inside public direction
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

// { restaurants }: 用{ }把變數包起來，就可以在前端引入
app.get('/restaurants', (req, res) => {
  // keyword = req.query."search"要符合search bar中input的name，且會直接等於路由?之後的參數
  const keyword = req.query.search
  const matchedRestaurants = keyword? restaurants.filter(restaurant => Object.values(restaurant).some((property) => {
    if (typeof (property) === 'string') {
      return property.toLowerCase().includes(keyword.toLowerCase())
    }
    return false
  })): restaurants
  // { restaurants: matchedRestaurants }就是object的key-value pair的意思，前端網頁可以引入key: restaurants把matched的餐廳帶入，所以key值restaurants跟變數restaurants無關，要改成什麼都可以，只要在前端引入正確的key值即可順利帶入
  res.render('index', { restaurants: matchedRestaurants, keyword })
})

// :id的意思就是產生一個key為id、value為輸入變數的pair存在object裡，結果為{ id: 輸入變數值 }，所以可以用來設計動態路由
app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find(restaurant => restaurant.id.toString() === id)
  res.render('detail', { restaurant })
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})