/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-29 23:08:59
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-08-11 00:16:41
 * @FilePath: /zulin/src/subPackagesMe/AuthLogin/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect, showToast, useDidShow } from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';
import { AtButton, AtCurtain, AtGrid, AtInput } from 'taro-ui';

import { useSelector, useDispatch } from '@tarojs/redux';
import { logIn } from '@/utils/auth';
import './index.scss';
import { showErrorToast } from '@/utils/util';

const AuthLogin = () => {
  const dispatch = useDispatch();

  // useDidShow(() => {
  //   console.log('执行了，AuthLogin-useDidShow');
  //         // eslint-disable-next-line no-undef
  //         wx.getUserProfile({
  //           desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //           success: (res) => {
  //             console.log(res);
  //             logIn({dispatch,userInfo: res.userInfo, SuccessCb : () => {
  //               Taro.navigateBack({
  //                   delta: 1//表示回到上一页面
  //               })
  //             }});
  //           }
  //         })
  // })

  const handleLogIn = () => {
    // eslint-disable-next-line no-undef
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        logIn({
          dispatch, userInfo: res.userInfo, SuccessCb: () => {
            Taro.navigateBack({
              delta: 1//表示回到上一页面
            })
          }
        });
      }
    })
  };
  const getPhoneNumber = (e) => {
    wx.getUserInfo({
      desc: '用于完善会员资料',
      success: async (res) => {
        console.log("获取到的用户信息：", res);
        // 这里提交数据到后端接口，成功返回后设置登录状态
        if ("getPhoneNumber:ok" == e.detail.errMsg) {
          await logIn(
            { dispatch,
               userInfo: res.userInfo, 
               phone: { encryptedData: e.detail.encryptedData, iv: e.detail.iv},
               SuccessCb: () => {
                Taro.navigateBack({
                  delta: 1//表示回到上一页面
                })
              }
              });
        } else {
          showErrorToast("登录失败")
        }

      },
      fail: (err) => {
        console.log(1212121, err)
      }
    })
  }

  return (
    <View className='AuthLogin-wrap' >
      <View className='AuthLogin-btn-con' >

        <Button open-type="getPhoneNumber" onGetPhoneNumber={getPhoneNumber} >
          授权登录
        </Button>
      </View>


    </View>
  );
};
export default AuthLogin;
