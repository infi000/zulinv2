import Taro, { useState, useEffect, showToast } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { AtButton, AtGrid, AtInput } from 'taro-ui';

import { useSelector, useDispatch } from '@tarojs/redux';
import { getbg, postPay } from './services';

import './index.scss';



const defaultForm: { [key: string]: any } = {};

const ConsignmentCreate = () => {
  const dispatch = useDispatch();
  const [bg, setBg] = useState('');
  const { categorys } = useSelector((state) => state.ConsignmentCreate);
  // title:商品名称
  // thumbinal:商品预览图,文件域
  // des:商品描述
  // price:商品价格
  // chargefee:手续费
  // uphone:联系手机号
  // gcid:商品分类id 
  // pics[]:寄卖商品详情图，文件域
  const [form, setForm] = useState(defaultForm);
  const handleUpdateForm = (opt: any) => {
    console.log(opt);
    setForm((params) => {
      return { ...params, ...opt };
    });
  };
  const handleSubmit = () => {
    // console.log(form);
    // return
    postPay({ ...form }).then(d => {
      const { arraydata } = d || {};
      const { nonceStr, timeStamp, signType, paySign } = arraydata || {};
      const pak = arraydata.package;
      Taro.requestPayment({
        timeStamp: timeStamp + "",
        nonceStr: nonceStr,
        package: pak,
        signType,
        paySign,
        success: function (res) {
          dispatch({ type: 'main/getUserInfo', payload: {} });
          Taro.showToast({
            title: '购买成功',
            icon: 'success',
            duration: 2000
          })
          // 返回上一级页面。
          setTimeout(() => {
            Taro.navigateBack({ delta: 1 });
          }, 2000);
        },
        fail: function (res) {
          showToast("购买失败");
          console.log(res)
        }
      })
    })
  };
  const handleCancel = () => {
    Taro.navigateBack({
      delta: 1, success: function (res) {

      }
    });
    return;
  };





  useEffect(() => {
    getbg({ sname: 'tabg' }).then((d) => {
      const { pic } = d;
      setBg(pic);
    })
  }, [])


  return (
    <View className='goodgoods-wrap'>
      <View className='myvip-wrap'>
        <Image mode='aspectFit' style='width: 100%;height: 200px;' src={bg} />
        <AtGrid
          onClick={(e) => handleUpdateForm({ total: e.key })}
          data={
            [
              { value: '100元', key: '100', },
              { value: '200元', key: '200', },
              { value: '300元', key: '300', },
              { value: '500元', key: '500', },
              { value: '800元', key: '800', },
              { value: '1000元', key: '1000', },
            ]
          } />
        <View className='at-row  at-row__align--center' style={{ margin: '10px 0'}}>
          <View className='at-col at-col-1 at-col--auto'>自定义金额:</View>
          <View className='at-col'>
            <AtInput
                name='total'
                value={form.total}
                onChange={(e) => handleUpdateForm({ total: e })}
            />
          </View>
        </View>
        <View className='edit-btn-wrap'>
          <View className='btn-submit'>
            <AtButton type='primary' size='small' onClick={handleSubmit}>
              充值
            </AtButton>
          </View>

          <AtButton size='small' onClick={handleCancel}>
            取消
          </AtButton>
        </View>
      </View>
    </View>
  );
};
export default ConsignmentCreate;
