const express = require("express");
const app = express();
const config =  require("./config/default.js")
const db = require('./mongodb')
const bodyParser = require("body-parser")
const routes = require('./routes')
const dotenv = require('dotenv')
dotenv.config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
routes(app)
app.listen(config.port,()=>{
  console.log(`Express server is listening port: ${config.port}`);
})
