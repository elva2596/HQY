const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
module.exports = MongoStore