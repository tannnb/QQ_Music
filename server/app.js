const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const IndexController = require('./controller/index')
const DiscController = require('./controller/disc')


// 加载解析json的中间件
/*app.use(bodyParser.json());*/

// 加载解析urlencoded请求体的中间件
app.use(bodyParser.urlencoded({extended: true}))


// CROS跨域设置
app.all("*", function (req, res, next) {
  if (req.path !== "/" && !req.path.includes(".")) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", 'http://localhost:8080');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8")
  }
  next();
})

// 路由
app.get('/musicu', IndexController.musicu)
app.get('/recommend', IndexController.recommend)
app.get('/newSongType', IndexController.newSongType)
app.get('/newAlbumArea', IndexController.newAlbumArea)
app.get('/getDiscList', DiscController.getDiscList)
app.post('/getPurlUrl', bodyParser.json(),DiscController.getPurlUrl)
app.get('/getLyric',DiscController.getLyric)



app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
