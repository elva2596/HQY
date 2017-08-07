module.exports = (app)=>{
  app.use('/api',require('./register.js'));
  app.use("/api",require("./login.js"));
};
