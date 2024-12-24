import Taro, { useState, useEffect, showToast } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { AtActionSheet, AtActionSheetItem, AtButton, AtGrid, AtInput, AtRadio } from 'taro-ui';

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
  const [openModal, setOpenModal] = useState(false)
  // title:商品名称
  // thumbinal:商品预览图,文件域
  // des:商品描述
  // price:商品价格
  // chargefee:手续费
  // uphone:联系手机号
  // gcid:商品分类id
  // pics[]:寄卖商品详情图，文件域

  const handleOpen = () => {
    setOpenModal(true)
  }
  const handleSubmit = (form: any) => {
    // if (!!!form.cardid) {
    //   showErrorToast("请选择购买的次卡类型");
    //   return
    // }
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
        <Image mode='aspectFill' style='width: 100%;height: 500px;' src={bg || 'https://xtblapi.leclubthallium.com/Public/static/images/defaultcicardbg.png'} />
        <View className='edit-btn-wrap'>
          <View className='btn-submit'>
            <AtButton type='primary' size='small' onClick={handleOpen} className='n-color-btn'>
              购买
            </AtButton>
          </View>

          <AtButton size='small' onClick={handleCancel}>
            取消
          </AtButton>
        </View>
        <AtActionSheet isOpened={openModal} title='次卡类型' onClose={ () => setOpenModal(false) }>
          {ccList.map((item: any) => {
            return <AtActionSheetItem onClick={() => handleSubmit({ cardid: item.id })}>
              {`${item.cardname}/${item.price}/(${USE_DAY_TYPE[item.usedaytype]})`}
            </AtActionSheetItem>
          })}
        </AtActionSheet>
      </View>
    </View>
  );
};
export default ConsignmentCreate;
