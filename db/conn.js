const mongooose = require('mongoose')
mongooose.set('strictQuery', false)
require("dotenv").config();

const db = process.env.MONGODB_KEY;

mongooose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("Your Database is Connected")).catch((err) => {
    console.log(err);
})