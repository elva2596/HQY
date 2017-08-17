const express = require("express");
const router = express.Router();
const verifyToken  = require("../middlewares")
router.get("/admin/home",verifyToken,(req,res)=>{
  res.send({
    status:1,
    msg:"success",
    data:"info"
  })
});
module.exports = router;
