let express = require('express')
let bodyParser = require('body-parser')
let server = express()
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
require('./server-assets/db/gearhost-config')

server.use(express.static(__dirname + "/www"))

let postRoutes = require('./server-assets/routes/post-routes')
let commentRoutes = require('./server-assets/routes/comment-routes')

server.use('/api/posts', postRoutes.router)
server.use('./api/comments', commentRoutes.router)





server.listen(3000, () => { console.log("serving") })
