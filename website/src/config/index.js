/**
 * w0:PC端作品列表的缩略图 -pcpictures
 * w1:移动端作品列表的缩略图 -mobilepictures
 * w01:PC端作品详情的缩略图 -pclunbo
 * w11:移动端作品详情的缩略图 -mlunbo
 */
const uploadUrl = "http://127.0.0.1:8089/api/admin/imgs"
const uploadParam = {
  url:"http://127.0.0.1:8089/api/admin/imgs",
  w0:"w0",
  w1:"w1",
  w01:"w01",
  w11:"w11"
}
const filterUrl = (isM,param) => {
  if(isM){

  }
  switch(param){
    case w0:
      return `${uploadUrl}?w0`
    case w1:
      return `${uploadUrl}?w1`
    case w01:
      return `${uploadUrl}?w01`
    case w11:
      return `${uploadUrl}?w11`
    default :
      return uploadUrl
  }
}
let author = {};
let configport  = 8089;
const port  = window.location.port;
if(port!=="80"){
  author = {
    cn:"曹雨",
    en:"CAOYU"
  }
  configport = 8088

}else{
  author = {
    cn:"胡庆雁",
    en:"HUQINGYAN"
  }
  configport = 8089;
}
// console.log()
// console.log(typeof port)
export default filterUrl
export {author,configport}
