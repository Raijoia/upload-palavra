const bodyParser = require('body-parser')
const users = require('./userRoutes')
const files = require('./fileRoutes')
 
module.exports = (app: any) => {
  app.use(
    bodyParser.json(),
    users,
    files
  )
}