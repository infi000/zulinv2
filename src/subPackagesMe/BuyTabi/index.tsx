import Taro, { useState, useEffect, showToast } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { AtButton, AtGrid, AtInput, AtRadio } from 'taro-ui';

import { useSelector, useDispatch } from '@tarojs/redux';
import { getUserBuycard, getbg, getccCard, postPay } from './services';

import './index.scss';
import { showErrorToast } from '@/utils/util';
import { USE_DAY_TYPE } from '@/utils/constants';



const defaultForm: { [key: string]: any } = {};

const ConsignmentCreate = () => {
  const dispatch = useDispatch();
  const [bg, setBg] = useState('');
  const [ccList, setCcList] = useState([]);
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
    if( !!!form.cardid){
      showErrorToast("请选择购买的次卡类型");
      return 
    }
    getUserBuycard(form).then(d => {
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
          showErrorToast("购买失败");
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
    getccCard({}).then(d => {
      const { cards } = d;
      setCcList(cards);
    }) 
  }, [])


  return (
    <View className='goodgoods-wrap'>
      <View className='myvip-wrap'>
        <Image mode='aspectFit' style='width: 100%;height: 200px;' src={bg || 'https://beyondplayapi.leclubthallium.com/Public/static/images/defaultcicardbg.jpg'} />
        {/* <AtGrid
          onClick={(e) => handleUpdateForm({ cardid: e.key })}
          data={
            ccList.map((item:any) => {
              return { value: `${item.cardname}/${item.price}`, key: item.id }
            })
          } /> */}
          <View>次卡类型:</View>
                   <AtRadio
        options={ccList.map((item: any) => ({ label: `${item.cardname}/${item.price}/(${USE_DAY_TYPE[item.usedaytype]})`, value: item.id }))}
        value={form.cardid}
        onClick={(e) => handleUpdateForm({ cardid: e })}
      />
        <View className='at-row  at-row__align--center' style={{ margin: '10px 0'}}>
        </View>
        <View className='edit-btn-wrap'>
          <View className='btn-submit'>
            <AtButton type='primary' size='small' onClick={handleSubmit}>
              购买
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
