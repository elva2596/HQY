const expres = require("express")
const register = require('../controllers/register')
const express = require('express');
const router = expres.Router();
router.post('/register',register)
module.exports = router
