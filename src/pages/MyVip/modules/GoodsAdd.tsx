import Taro from '@tarojs/taro';
import { AtButton, AtInput, AtNavBar } from 'taro-ui';
import { View, Block, Image } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { postAdddetail } from '../services';
import Uploader from '../../../components/Uploader';
import { showSuccessToast } from '@/utils/util';

import '../index.scss';

const { useState } = Taro;
const defaultForm: { [key: string]: any } = {};
const GoodsAdd = () => {
  const { pageInfo } = useSelector((state) => state.myvip);
  const dispatch = useDispatch();
  const [form, setForm] = useState(defaultForm);
  const { data } = pageInfo || {};
  const handleUpdateForm = (opt: any) => {
    setForm((params) => {
      return { ...params, ...opt };
    });
  };
  const handleSubmit = () => {
    const {data} = pageInfo || {};
    const {cid} = data || {};
    postAdddetail({ ...form,ccid: cid }).then((d) => {
      showSuccessToast("提交成功")
      handleCancel();
    });
  };
  const handleCancel = () => {
    dispatch({ type: 'myvip/updatePageInfo', payload: { type: 'goods', data: data } });
  };
  return (
    <Block>
       <AtNavBar onClickLeftIcon={handleCancel} color='#000' title='添加信息' leftText='返回' border />
      <View className='myvip-wrap'>
        {/* <AtInput
          className='goods-input'
          // style="display:none"
          required
          name='ccid'
          title='传承信息id'
          value={form.ccid}
          onChange={(e) => handleUpdateForm({ ccid: e })}
        /> */}
        <AtInput
          className='goods-input'
          required
          name='detail'
          title='物品描述'
          value={data.detail}
          onChange={(e) => handleUpdateForm({ detail: e })}
        />
        <AtInput
          className='goods-input'
          required
          name='cstatus'
          title='物品状态描述'
          value={data.cstatus}
          onChange={(e) => handleUpdateForm({ cstatus: e })}
        />
         <View>
          图片
          <Uploader length={3} uploadSucc={(e) => handleUpdateForm({pics:e})} />
        </View>
        <View className='edit-btn-wrap'>
          <View className='btn-submit'>
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

export default GoodsAdd;
