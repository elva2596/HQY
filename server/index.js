const express = require("express");
const app = express();
const config =  require("./config/default.js")
const db = require('./mongodb')
const bodyParser = require("body-parser")
const ssesion = require("express-session")
const routes = require('./routes')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(ssesion(config.session))
routes(app)
app.listen(config.port,()=>{
  console.log(`Express server is listening port: ${config.port}`);
})
