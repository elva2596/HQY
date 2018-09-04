const axios = require('axios')
const  urlConfig = require('./urlConfig');
const {works,exh} = urlConfig

function getSmallPic(type,imgUrl){
  let urlArr = null
  switch(type){
    case 0:
      urlArr = works
      break;
    case 1:
      urlArr = exh
      break;
    case 2:
      break;
  }
  let promises = urlArr.map((item)=>axios.get(`${imgUrl}-${item}?imageInfo`))

  return Promise.all(promises)
}
module.exports =  getSmallPic
