/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-25 13:18:12
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-09-21 00:14:38
 * @FilePath: /zulinv2/src/pages/PicketResult/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useDidShow, useRouter, useState } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { detailbyccode, Cardcheck } from './services';
import './index.scss';
import { formatDate, showErrorToast } from '@/utils/util';
import { get } from 'lodash';
import { AtButton, AtInputNumber } from 'taro-ui';
import { CARD_TYPE, USE_DAY_TYPE } from '@/utils/constants';


const PicketResult = () => {
  const [picketInfo, SetPicketInfo] = useState<any>({});
  const router = useRouter();
  const [form, setForm] = useState({ duration: 3 });
  const handleBack = (opt: any) => {
    Taro.reLaunch({ url: '/pages/Main/index' })
  };

  const handleSubmit = async () => {
    const { params } = router;
    const { ccode = '' } = params;
    try {
      const { card } = await Cardcheck({ccode});
      SetPicketInfo(card || {});
      showErrorToast('消费成功')
    } catch (error) {
      showErrorToast(error.toString())
    }
  }
  useDidShow(async () => {
    const { params } = router;
    const { ccode = '' } = params;
    try {
      const { card } = await detailbyccode({ ccode });
      SetPicketInfo(card);
    } catch (error) {
      showErrorToast(error.toString())
    }

  });
  return (
    <View className='qrres-wrap'>
      <View className='line2'>status:{picketInfo.status}</View>
      <View className='line1'>id:{picketInfo.id}</View>
      <View className='line1'>卡类型:{CARD_TYPE[picketInfo.cardtype]}</View>
      <View className='line1'>有效期:{formatDate(picketInfo.cardexpired)}</View>
      <View className='line1'>开始时间:{formatDate(picketInfo.cardstarttime)}</View>
      <View className='line1'>剩余次数:{picketInfo.leftcount}</View>
      <View className='line1'>总次数:{picketInfo.totalcount}</View>
      <View className='line1'>totalprice:{picketInfo.totalprice}</View>
      <View className='line1'>使用日类型:{USE_DAY_TYPE[picketInfo.usedaytype]}</View>
      <View className='line1'>备注:{picketInfo.remark}</View>
      <View className='qrres-set-wrap'>
           <AtButton type='primary' size='normal' onClick={handleSubmit} className='picket-btn'>确定</AtButton>
           <AtButton size='normal' onClick={handleBack}>返回</AtButton>
      </View>


   
    </View>
  );
};

export default PicketResult;
