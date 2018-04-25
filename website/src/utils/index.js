
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
  }
}
