import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtAvatar } from 'taro-ui';

import './index.scss';

interface IProps {
  head?:string;
  nickName?:string;
  msg?:string;
  time?:string;
}

const Comment = (props:IProps) => {
  const {head,nickName,msg,time } = props;
  return (
    <View className='at-row  comment-line'>
      <View className='at-col at-col-1 at-col--auto comment-line-left'>
        <AtAvatar circle image={head}  size='large'></AtAvatar>
      </View>
      <View className='at-col comment-line-right'>
          <View className='comment-line-top'>{nickName || '未知'}</View>
          <View className='comment-line-mid'>{msg || '-'}</View>
          <View className='comment-line-bottom'>{time || '未知'}</View>
      </View>
    </View>
  );
};
export default Comment;
