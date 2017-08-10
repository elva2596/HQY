const express = require("express");
const login = require("../controllers/login.js");
const router = express.Router();
const {checkNotLogin} = require('../middlewares/index')
router.post("/admin/login",checkNotLogin,login);
module.exports = router;
