const bodyParser = require('body-parser')
const users = require('./userRoutes')
const files = require('./fileRoutes')
const auth = require('./authRoutes')
 
module.exports = (app: any) => {
  app.use(
    bodyParser.json(),
    auth,
    users,
    files
  )
}