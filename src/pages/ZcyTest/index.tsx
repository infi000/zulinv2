import Taro, { useDidShow } from '@tarojs/taro';
import { View, Checkbox, Block, Button, WebView } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
import { useCheckBoxList } from '@/utils/hooks';
import QRCode from '../../utils/weapp-qrcode.js';
import { useSelector } from '@tarojs/redux';



const ZcyTest = () => {
  const main = useSelector((state) => state.main);
  console.log('main', main);
  const handleGet = () => {
    if(Taro.chooseAddress){
      Taro.chooseAddress({
       success: function (res) {
        console.log("成功",res);
       },
       fail: function(err){
         console.log("失败",err);
       }
      })
     }else{
      console.log('当前微信版本不支持chooseAddress');
     }
  };
  useDidShow(() => {
    // 切换tab 请求接口
    wx.getSetting({
      success (res) {
      console.log(1231312313123213213123, res.authSetting)
      if(res.authSetting['scope.userLocation']){
        console.log("已经授权");
        //已经授权
        wx.getLocation({
          success(res){
            console.log("获取到当前地址：", res);
            wx.openLocation({
              latitude: res.latitude, // 纬度，浮点数，范围为90 ~ -90
              longitude: res.longitude, // 经度，浮点数，范围为180 ~ -180。
              // name: '', // 位置名
              // address: '', // 地址详情说明
              // scale: 1, // 地图缩放级别,整型值,范围从1~28。默认为最大
              // infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
            });
            
            
          }
        })
      }else{
        console.log("未授权 引导");
        // 未授权 引导
        wx.authorize({
          scope: 'scope.userLocation',
          success (res) {
            console.log("授权成功", res);
          }
        })
        // wx.openSetting({
        //   success(res) {
        //     if(res.authSetting['scope.userLocation']){
        //       wx.getLocation({
        //         success(res){
        //           console.log("获取到当前地址：", res);
        //         }
        //       })
        //     }
        //   }
        // })
      }
      // res.authSetting = {
      //   "scope.userInfo": true,
      //   "scope.userLocation": true
      // }
      }
      })
  });
  const handleCarm = () => {
    // eslint-disable-next-line no-undef
    wx.scanCode({
      onlyFromCamera: true,
      success (res) {
        console.log(res)

        Taro.navigateTo({ url: res.result});
      }
    })
  }
  return (
    <View>
      阿斯顿发送到发的沙发舒服
    </View>
  );
};

export default ZcyTest;
