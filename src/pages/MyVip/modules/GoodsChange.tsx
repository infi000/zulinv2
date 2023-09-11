import Taro, { useState } from '@tarojs/taro';
import { AtButton, AtInput, AtNavBar } from 'taro-ui';
import { View, Block, Image } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { postChangecc } from '../services';
import Uploader from '../../../components/Uploader';

import '../index.scss';

const { useState } = Taro;
const defaultForm: { [key: string]: any } = {};
const GoodsChange = () => {
  const { pageInfo } = useSelector((state) => state.myvip);
  const dispatch = useDispatch();
  const [form, setForm]:[any, any] = useState(()=>{
    const { data } = pageInfo;
    const {gid,cid} = data;
    return {gid,cid}
  });
  const { data } = pageInfo || {};
  const handleUpdateForm = (opt: any) => {
    setForm((params) => {
      return { ...params, ...opt };
    });
  };
  const handleSubmit = () => {
    postChangecc({ ...form }).then((d) => {
      handleCancel();
    });
  };

  const handleCancel = () => {
    dispatch({ type: 'myvip/updatePageInfo', payload: { type: 'goods', data: data } });
  };
  const handleUpload = (opt) =>{

  }
  return (
    <Block>
      <AtNavBar onClickLeftIcon={handleCancel} color='#000' title='变更归属' leftText='返回'  border />
      <View className='myvip-wrap'>
        <AtInput
          className='goods-input'
          
          name='phone'
          title='持有者手机号'
          type='phone'
          value={form.phone}
          onChange={(e) => handleUpdateForm({ phone: e })}
        />
        <AtInput
          className='goods-input'
          required
          name='bphone'
          title='购买者手机号'
          type='phone'
          value={form.bphone}
          onChange={(e) => handleUpdateForm({ bphone: e })}
        />
        <AtInput
          className='goods-input'
          name='buid'
          title='购买者id'
          value={form.buid}
          onChange={(e) => handleUpdateForm({ buid: e })}
        />
        <AtInput
          className='goods-input'
          required
          name='price'
          title='交易价格'
          value={form.price}
          onChange={(e) => handleUpdateForm({ price: e })}
        />
        <AtInput
          className='goods-input'
          required
          name='address'
          title='地址'
          value={form.address}
          onChange={(e) => handleUpdateForm({ address: e })}
        />
        <View>
          发票图片
          <Uploader length={1} uploadSucc={(e) => handleUpdateForm({billid:e})} />
        </View>
        <View>
          转账图片
          <Uploader  length={1} uploadSucc={(e) => handleUpdateForm({payid:e})}/>
        </View>
        <View>
          其它图片
          <Uploader length={5} uploadSucc={(e) => handleUpdateForm({opics:e})} />
        </View>


        <View className='edit-btn-wrap'>
          <View className='btn-submit'>
            {/* <AtButton type='primary' size='small' onClick={handleUpload}>
              图片
            </AtButton> */}
            <AtButton type='primary' size='small' onClick={handleSubmit}>
              提交
            </AtButton>
          </View>

          <AtButton size='small' onClick={handleCancel}>
            取消
          </AtButton>
        </View>
      </View>
    </Block>
  );
};

export default GoodsChange;

// openid:用户唯一标识
// gid: 商品id
// phone：持有者手机号
// buid:购买者id
// bphone：购买者手机号
// price：交易价格
// bill:bill文件域，发票图片
// pay:pay文件域，转账图片
// opic1:其他图片文件域，多个时，例如有n个，就是opic1、opic2、…、opicn
