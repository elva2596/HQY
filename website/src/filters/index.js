import moment from "moment"
export const formatTime = (isEn)=>{
  return (time)=>{
    if(isEn){
      //转换成英文格式
      return moment(time).format('MMMM.D YYYY')
    }else{
      // 转换成中文格式
      return moment(time).format('YYYY-MM-DD')
    }
  }
}
