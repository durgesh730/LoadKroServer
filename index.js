const express = require('express')
require('./db/conn')
const app = express()
const cors = require('cors')
require("dotenv").config();
const port = process.env.Host_PORT_NO;

app.use(cors())
app.use(express.json())
app.use('/user', require('./routes/userRoute'));
app.use('/driver', require('./routes/driverRoute'));
app.use('/comment', require('./routes/commentsRoute'));
app.use('/admin', require('./routes/adminRoute'));
app.use('/city', require('./routes/citiesRoute'))

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`)
})