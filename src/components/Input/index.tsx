import Taro, { useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtTextarea, AtButton } from 'taro-ui';

import './index.scss';

interface IProps {
    onCancel:() => void;
    onOk:(params:any) => void;
}

const InputPage = (props: IProps) => {
  const { onCancel, onOk } = props;
  const [value, setValue] = useState('');

  const handleSumbit = () => {
    value &&  onOk({msg:value});
    value && onCancel();
  };
  const handleBack = () => {
    onCancel();
  };

  return (
    <View className='page-wrape inputpage-wrap'>
      <AtTextarea value={value} onChange={setValue} maxLength={200} />
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
export default InputPage;
