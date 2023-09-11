import Taro from '@tarojs/taro';
import { getJscode2session, saveUserData, setwxuserphone } from '@/services/user';

export const logIn = (params: { dispatch: any; SuccessCb?: Function; errorCb?: Function; userInfo: any, phone: any }) => {
  const { dispatch, SuccessCb, errorCb, userInfo, phone } = params;
  Taro.login({
    success: async function (res) {
      if (res.code) {
        //发起网络请求
        const { code } = res;
        console.log('123',code); // todo
        
        // return
        getJscode2session({ jscode: code }).then((d) => {
          const openid = d.od;
          const ut = d.ut;
          const nickName = userInfo.nickName;
          const avatarUrl = userInfo.avatarUrl;
          const gender = userInfo.gender; //性别 0：未知、1：男、2：女
          const province = userInfo.province;
          const city = userInfo.city;
          const country = userInfo.country;
          saveUserData({ nickName, avatarUrl, gender, province, country, city, openid }).then(() => {
            Taro.setStorage({ key: 'wxUserInfo', data: { nickName, avatarUrl, gender, province, country, city, openid, ut } });
            dispatch({ type: 'main/updateIsLogIn', payload: true });
            dispatch({ type: 'main/updateWxUserInfo', payload: { nickName, avatarUrl, gender, province, country, city, openid, ut } });
            dispatch({ type: 'main/updateOpenid', payload: openid });
            setTimeout(function(){
                wx.login({
                  success: function(rp) {
                    // console.log(res);
                    if (rp.code) {
                      //用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 api，使用 code 换取 openid 和 session_key 等信息
                      console.log("登录的code:", rp.code)
                      // 调用后端接口传入手机号信息
                      
                      setwxuserphone({
                        jscode: rp.code,
                        encryptedData: phone.encryptedData,
                        iv: phone.iv,
                        openid: openid
                      })
                      
                    } else {
                      // showErrorToast("登录失败")
                    }
                  }
                });
            }, 2000);
          });
        
          setTimeout(() => {
            dispatch({ type: 'main/getUserInfo', payload:{}});
            SuccessCb && SuccessCb();
          }, 500);


        });
      } else {
        console.log('登录失败！' + res.errMsg);
      }
    },
  })
};

export default {};