/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-25 13:18:12
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-20 23:53:36
 * @FilePath: /zulinv2/src/pages/PicketResult/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useDidShow, useRouter, useState } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { detailbyccode, Cardcheck } from './services';
import './index.scss';
import { formatDate, showErrorToast } from '@/utils/util';
import { get } from 'lodash';
import { AtActionSheet, AtActionSheetItem, AtButton, AtInputNumber } from 'taro-ui';
import { CARD_TYPE, USE_DAY_TYPE } from '@/utils/constants';

const createArr = (len:number) => {
  if(!len || len === 0){
    return []
  }
  let arr:any = []
for(let i = 1; i < len+1; i++) {
  arr.push(i)
}
return arr
}

const PicketResult = () => {
  const [picketInfo, SetPicketInfo] = useState<any>({});
  const router = useRouter();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const handleBack = (opt: any) => {
    Taro.reLaunch({ url: '/pages/Main/index' })
  };
  const [hxCount, setHxCount] = useState(1)

  const handleSubmit = async () => {
    const { params } = router;
    const { ccode = '' } = params;
    try {
      const { card } = await Cardcheck({ ccode, checknum: hxCount });
      SetPicketInfo(card || {});
      showErrorToast('消费成功')
      setBtnDisabled(true)
    } catch (error) {
      showErrorToast(error.toString())
    }
  }
  useDidShow(async () => {
    const { params } = router;
    const { ccode = '' } = params;
    setBtnDisabled(false)
    try {
      const { card } = await detailbyccode({ ccode });
      SetPicketInfo(card);
    } catch (error) {
      showErrorToast(error.toString())
    }

  });
  console.log('picketInfo.leftcount',picketInfo);
  return (
    <View className='qrres-wrap'>
      <View className='qrres-con1'>
        <View className='line1'>卡类型: <span>{CARD_TYPE[picketInfo.cardtype]}</span></View>
        <View className='line1'>有效期: <span>{formatDate(picketInfo.cardexpired)}</span></View>
        <View className='line1'>剩余次数: <span>{picketInfo.leftcount}</span></View>
        <View className='line1'>类型: <span>{USE_DAY_TYPE[picketInfo.usedaytype]}</span></View>
      </View>
      <View className='qrres-con2'>
        <View className='line1'>开始时间: <span>{formatDate(picketInfo.cardstarttime)}</span></View>
        <View className='line1'>总价: <span>{picketInfo.totalprice}</span></View>
        <View className='line1'>总次数: <span>{picketInfo.totalcount}</span></View>
        <View className='line1'>备注: <span>{picketInfo.remark}</span></View>
        <View className='line1'>状态: <span>{picketInfo.status}</span></View>
        <View className='line1'>id: <span>{picketInfo.id}</span></View>
      </View>
      <View className='qrres-con2'>
        <View className='line1'>核销次数: <AtInputNumber
          min={1}
          max={picketInfo && picketInfo.leftcount ? Number(picketInfo.leftcount):1 }
          step={1}
          value={hxCount}
          onChange={setHxCount} type={'number'}      /></View>
      </View>
      <View className='qrres-set-wrap'>
        <AtButton type='primary' size='normal' onClick={handleSubmit} className='picket-btn' disabled={btnDisabled}>确定</AtButton>
        <AtButton size='normal' onClick={handleBack}>返回</AtButton>
      </View>



    </View>
  );
};

export default PicketResult;
