import Taro from '@tarojs/taro';
import { showErrorToast } from '../utils/util';

/**
 * 封封微信的的request
 */
function request(url, data = {}, method = 'GET') {
  let openid = '';
  let header = {
    'Content-Type': 'application/json',
  };
  try {
    var value = Taro.getStorageSync('wxUserInfo'); 
    // var value = {openid: '888888'} ; // todo 测试用
    if (value) {
      openid = value.openid;
    }
    // openid = 234567;
  } catch (e) {}

  if (method === 'FORM') {
    data.append('openid', openid);
    header = {
      "Content-Type": "application/x-www-form-urlencoded",
      'Authorization': 'Bearer agXvPnn-VFwDrOWUymLVopN1_xeFWxzE_1678028883'
    }
  } else if (method === 'POST') {
    data = { openid, ...data };
    header = {
      "Content-Type": "application/x-www-form-urlencoded",
      'Authorization': 'Bearer agXvPnn-VFwDrOWUymLVopN1_xeFWxzE_1678028883'
    }
  }else {
    data = { openid, ...data };
  }
  console.log('data', data);
  console.log('openid', openid);
  return new Promise(function(resolve, reject) {
    Taro.request({
      url,
      data,
      method,
      header,
      success: function(res) {
        if (res.statusCode == 200) {
          if (res.data.errno == 501) {
            // 清除登录相关内容
            try {
              // Taro.removeStorageSync('userInfo');
              // Taro.removeStorageSync('token');
            } catch (e) {
              // Do something when catch error
            }
            // 切换到登录页面
            // Taro.navigateTo({
            //   url: '/pages/auth/login/login'
            // });
          } else if (res.data.res == 'succ') {
            resolve(res.data.data);
          } else {
                        console.log("res",res);

            if( res.data.errdata && res.data.errdata.errorcode){
              Taro.navigateTo({ url: '/subPackagesMe/AuthLogin/index' });
            }else{
              console.log("err api:",url, openid, data)
              showErrorToast(res.data.errdata || res.data);
              reject(res.data.errdata);
            }

       
          }
        } else {
          console.log("res",res);
          showErrorToast('接口错误')
          // reject(res.errdata);
        }
      },
      fail: function(err) {
        console.log(err)
        // reject(err);
      },
    });
  });
}

request.get = (url, data) => {
  return request(url, data, 'GET');
};

request.post = (url, data) => {
  return request(url, data, 'POST');
};

request.form = (url, data) => {
  return request(url, data, 'FORM');
};

request.formData = (url, data) => {
  let openid = '';
  try {
       var value = Taro.getStorageSync('wxUserInfo');
      //  var value = {openid: '888888'} ; // todo 测试用
    if (value) {
      openid = value.openid;
    }
  } catch (e) {}

  return new Promise(function(resolve, reject) {
    Taro.uploadFile({
      url:url,
      filePath:[],
      name: 'file',
      formData: {
        'openid': openid,
        ...data
      },
      success: function(res) {
        if (res.statusCode == 200) {
          if (res.data.errno == 501) {
            // 清除登录相关内容
            try {
              // Taro.removeStorageSync('userInfo');
              // Taro.removeStorageSync('token');
            } catch (e) {
              // Do something when catch error
            }
            // 切换到登录页面
            // Taro.navigateTo({
            //   url: '/pages/auth/login/login'
            // });
          } else if (res.data.res == 'succ') {
            resolve(res.data.data);
          } else {
            // Taro.showModal({
            //   title: '错误信息',
            //   content: res.data.errmsg,
            //   showCancel: false
            // });
            console.log("res",res);
            showErrorToast(res.data.errdata);
            // reject(res.data.errdata);
          }
        } else {
          console.log("res",res);
          showErrorToast(res.data.errdata);
        }
      },
      fail: function(err) {
        console.log(err);
        showErrorToast('接口错误')
        // reject(err);
      },
    });
  });
};

request.uploadFile = (url, data) => {
  let openid = '';
  try {
    var value = Taro.getStorageSync('wxUserInfo');
    if (value) {
      openid = value.openid;
    }
  } catch (e) {}
console.log("upload-opid", openid)

  return new Promise(function(resolve, reject) {
    Taro.uploadFile({
      url:url+"?openid="+openid,
      filePath:data,
      name: 'file',
      formData: {
        openid,
        ...data
      },
      header:{
        'content-type': 'multipart/form-data',
        'Authorization': 'Bearer agXvPnn-VFwDrOWUymLVopN1_xeFWxzE_1678028883'
      },
      success: function(res) {
        if (res.statusCode == 200) {
          res.data = JSON.parse(res.data);
            // resolve(res.data);
          if (res.data.errno == 501) {
            
          } else if (res.data.res == 'succ') {
            resolve(res.data.data);
          } else {
            // Taro.showModal({
            //   title: '错误信息',
            //   content: res.data.errmsg,
            //   showCancel: false
            // });
            console.log("res1",res, openid);
            showErrorToast(res.data.errdata);
            // reject(res.data.errdata);
          }
        } else {
          console.log("res2",res);
          showErrorToast(res.data.errdata);
        }
      },
      fail: function(err) {
        console.log(err);
        showErrorToast('接口错误')
        // reject(err);
      },
    });
  });
};

export default request;