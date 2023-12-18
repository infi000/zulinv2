/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-09-20 23:48:08
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-11-17 00:17:05
 * @FilePath: /zulinv2/src/pages/PicketMallResult/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useDidShow, useRouter, useState } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { picketCheck, setpicketduration } from './services';
import './index.scss';
import { showErrorToast } from '@/utils/util';
import { get } from 'lodash';
import { AtButton, AtInputNumber } from 'taro-ui';


const PicketMallResult = () => {
  const [picketInfo, SetPicketInfo] = useState({});
  const router = useRouter();
  const [form, setForm] = useState({ duration: 2 });
  const handleUpdateForm = (opt: any) => {
    console.log(opt);
    setForm((params) => {
      return { ...params, ...opt };
    });
  };

  const handleSubmit = async () => {
    const { params } = router;
    const { data } = params;
    try {
      const res = await setpicketduration({ 
        pid: get(picketInfo, ['p', 'id'], ''), ...form });
        showErrorToast('设置成功')
        setTimeout(() => {
          Taro.navigateBack({
            delta: 1//表示回到上一页面
        })
        }, 500);
    
    } catch (error) {
      showErrorToast(error.toString())
    }
  }
  useDidShow(async () => {
    const { params } = router;
    const { data } = params;
    try {
      const res = await picketCheck({ data });
      SetPicketInfo(res);
    } catch (error) {
      showErrorToast(error.toString())
    }

  });
  return (
    <View className='qrres-wrap'>
      <View className='line2'>验票结果:{get(picketInfo, ['msg'], '-')}</View>

      <View className='line1'>活动id:{get(picketInfo, ['p', 'id'], '-')}</View>
      <View className='line1'>活动:{get(picketInfo, ['p', 'cardname'], '-')}</View>
      <View className='line1'>开场时间:{get(picketInfo, ['p', 'stime'], '-')}</View>
      <View className='line1'>结束时间:{get(picketInfo, ['p', 'etime'], '-')}</View>
      <View className='line3'>
        检票历史：
        {!Array.isArray(picketInfo.checks) ? '暂无' : picketInfo.checks.map((item) => {
          return <View className='line3-1'>{item['checktime']}检票成功</View>
        })}
      </View>
      <View className='qrres-set-wrap'>
        设置检票时长
        <AtInputNumber
          className='qrres-set-input'
          min={1}
          max={12}
          step={1}
          value={form.duration}
          onChange={(e) => handleUpdateForm({ duration: e })}
          type={'number'}
        />
           <AtButton type='primary' size='normal' onClick={handleSubmit}>确定</AtButton>
      </View>


   
    </View>
  );
};

export default PicketMallResult;
