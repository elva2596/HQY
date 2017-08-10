const express = require("express");
const register = require('../controllers/register');
const router = express.Router();
const {checkNotLogin}  = require("../middlewares")
router.post('/admin/register',checkNotLogin,register);
module.exports = router;
