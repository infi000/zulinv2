/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-29 23:08:59
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-08-11 00:32:23
 * @FilePath: /zulin/src/pages/PicketQr/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useDidShow, useRouter, useState } from '@tarojs/taro';
import { View, Button, Block } from '@tarojs/components';
import { picketSearch } from './services';
import QRCode from '../../utils/weapp-qrcode.js';
import './index.scss';
import { get } from 'lodash';
import { showErrorToast } from '@/utils/util';


const PicketQe = () => {
  const router = useRouter();
  const [info, setInfo] = useState<any>({});
  const [bTime, setBTime] = useState<any>('');
  const restTime = (_info) => {
    if(_info.ischeck === '1' && _info.endtime){
      const setTime = new Date(_info.endtime);
      const nowTime = new Date();
    
      const restSec:any = setTime.getTime() - nowTime.getTime();
      const day = parseInt(restSec / (60*60*24*1000));
      const hour = parseInt(restSec / (60*60*1000) % 24);
      const minu = parseInt(restSec / (60*1000)%60);
      const sec = parseInt(restSec / 1000 % 60);
      const str = day + '天' + hour + '时' + minu + '分' + sec + '秒';
      if(restSec <= 0){
        setBTime('')
        return;
      }
      setBTime(str)
    }
    setTimeout(() => restTime(_info), 1000);
  }
  useDidShow(async () => {
    const { params } = router;
    try {
      const res = await picketSearch({ orderid: params.orderid });
      setInfo(res['pickets'][0]);
      restTime(res['pickets'][0])
      // const codeCon = get(res,['pickets',0,'codecontent'], '');
      const W = wx.getSystemInfoSync().windowWidth;
      const rate = 750.0 / W;
      const qrcode_w = 300 / rate;

      const codeCon = res['pickets'][0]['codecontent'];
      const qrText = "/pages/PicketResult/index?data=" + codeCon;

      const q = new QRCode('canvas', {
        // usingIn: this,
        text: qrText,
        width: qrcode_w,
        height: qrcode_w,
        padding: 12,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
        callback: (res) => {
          // 生成二维码的临时文件
          console.log(res.path)
          console.log(qrcode_w)
        }
      });
      console.log(q);
    } catch (error) {
      showErrorToast(error.toString())
    }
  });



  return (
    <View className='qr-wrap'>
      <View className='qr-box'>
        <View className='qr-top'>
        
        </View>
        <canvas class='canvas' canvas-id='canvas' bindlongtap='save'></canvas>
        <View className='qr-line1'>扫码关注</View>
        {/* <View className='qr-title'>TITLE</View> */}
        <View className='qr-line2'>票务名称：{info.title?`《${info.title}》`: ''}</View>
        <View className='qr-line2'>购买时间：{info.createtime}</View>
        {
          info.ischeck === '1' && <Block>
             <View className='qr-line2'>开始时间：{info.starttime}</View>
             <View className='qr-line2'>结束时间：{info.endtime}</View>
             <View className='qr-line2'>倒计时：{bTime}</View>
          </Block>
        }
        <View className='qr-line2'>是否验票：{info.ischeck === '1' ? '已验票' : '未验票'}</View>
        <View className='qr-buttom'>
        <View className='qr-line'></View>
        <View className='qr-line3'>最终解释权归主办方所有</View>
        </View>
      </View>
    </View>
  );
};


export default PicketQe;