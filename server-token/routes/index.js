module.exports = (app)=>{
  app.use('/api',require('./register.js'));
  app.use("/api",require("./login.js"));
  app.use("/api",require("./loginout"));
  app.use("/api",require("./home"));
  app.use("/api",require("./getUserByName"));
};
