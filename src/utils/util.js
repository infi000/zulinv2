/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-29 23:08:59
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-08-29 23:31:56
 * @FilePath: /zulin/src/utils/util.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro from '@tarojs/taro';

import {ImgError} from '../static/images/index';

export function showErrorToast(msg) {
  console.log("msg",msg);
  Taro.showToast({
    title: msg||'错误',
    icon: 'none',
  })
}
export function showSuccessToast(msg) {
  Taro.showToast({
    title: msg,
    icon: 'success',
  })
}
export function showToast(msg,  duration) {
  Taro.showToast({
    title: msg,
    icon: 'none',
    duration:  duration || 2000
  })
}


export function redirect(url) {

  //判断页面是否需要登录
  if (false) {
    Taro.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    Taro.redirectTo({
      url: url
    });
  }
}


export function isEmpty(params) {
  if(params === ''){
    return true
  }
  if(params === undefined){
    return true
  }
  if(params === null){
    return true
  }
  return false;
}

/**
 * 获取当前日期
 * @returns 
 */
export function currentDate() {
    var now = new Date();
    var year = now.getFullYear();     //获取完整的年份(4位,1970-????)
    var month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1 ;     //获取当前月份(0-11,0代表1月)
    var day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();

    return year+"-"+month+"-"+day;
}
/**
 * 获取当前小时
 * @returns 
 */
export function currentHour() {
  var now = new Date();
  var hour = now.getHours()

  return hour;
}

/**
 * 计算倒计时
 * timestamp 开始时间戳
 * minutes   倒计时时长
 */
export function calcCountDown(timestamp, minutes) {
  let now = new Date().getTime();
  now = parseInt(now/1000)
  let countDown = now - timestamp;
  let sy = minutes*60 - countDown
  if(sy < 0) {
    return {h:0, s:0};
  }
  
console.log("倒计时", sy)
console.log("当前时间戳", now)
  let h = parseInt(sy/60);
  let s = parseInt(sy%60);

  return {h:h, s:s};
}