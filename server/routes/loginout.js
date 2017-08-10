const loginout = require('../controllers/loginout');
const express = require("express");
const router = express.Router();
const {checkLogin}  = require("../middlewares");
router.put('/admin/loginout',checkLogin,loginout);
module.exports = router;
