
export default {
  changeNumber(val){
    switch(val){
      case 1:
        return "一"
        break;
      case 2:
        return "二"
        break;
      case 3:
        return "三"
        break;
      case 4:
        return "四"
        break;
      case 5:
        return "五"
    }
  },

  /**
   * [判断是否是一定断设备]
   * @param  {[type]}  userAgent [description]
   * @return {Boolean}           [description]
   */
  isMobile(){
    const userAgentInfo = window.navigator.userAgent;
    const agents = ["Android","iPhone","Windows Phone"]
    return agents.some((agent)=>userAgentInfo.indexOf(agent)>-1)
  },

  filterUrl(arr,isEn) {
    let urlArr = []
    if(arr&&arr.length>0){
      if(isEn){
       urlArr = arr.filter(item => /[\w]*\-EN$/.test(item.name.match(/(\S*)\.pdf$/)[1]))
         if(urlArr.length>0){
           return urlArr[0].url
         }
      }else{
       urlArr = arr.filter(item => /[\w]*\-CN$/.test(item.name.match(/(\S*)\.pdf$/)[1]))
        if(urlArr.length>0){
          return urlArr[0].url
        }
      }
      // return arr[0].url
    }
    return null
  }
}
