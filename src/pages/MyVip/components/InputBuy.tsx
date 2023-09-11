import Taro, { useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtInput, AtButton } from 'taro-ui';
import '../../../components/Input/index.scss';

interface IProps {
  onCancel: () => void;
  onOk: (params: any) => void;
}
const defaultForm = { msg: '', phone: '', price: '' };
const InputBuy = (props: IProps) => {
  const { onCancel, onOk } = props;
  const [form, setForm] = useState(defaultForm);
  const handleUpdateForm = (item) => {
    setForm((params: any) => {
      return { ...params, ...item };
    });
  };
  const handleSumbit = () => {
    form.msg && form.phone && form.price && onOk(form);
    form.msg && form.phone && form.price && onCancel();
  };
  const handleBack = () => {
    onCancel();
  };

  return (
    <View className='page-wrape inputpage-wrap'>
      <AtInput required name='msg' title='留言' type='text' value={form.msg} onChange={(e) => handleUpdateForm({ msg: e })} />
      <AtInput required name='phone' title='联系电话' type='phone' value={form.phone} onChange={(e) => handleUpdateForm({ phone: e })} />
      <AtInput required name='price' title='价格' type='text' value={form.price} onChange={(e) => handleUpdateForm({ price: e })} />
      <View className='bottom-wrap'>
        <View className='bottom-wrap-button'>
          <AtButton type='primary' size='small' onClick={handleSumbit}>
            提交
          </AtButton>
        </View>
        <AtButton size='small' onClick={handleBack}>
          取消
        </AtButton>
      </View>
    </View>
  );
};
export default InputBuy;
