const axios = require('axios')
const  urlConfig = require('./urlConfig');
const {works} = urlConfig

function getSmallPic(imgUrl){

  let promises = works.map((item)=>axios.get(`${imgUrl}-${item}?imageInfo`))
  
  return Promise.all(promises)
}
module.exports =  getSmallPic
