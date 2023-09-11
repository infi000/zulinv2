import Taro from '@tarojs/taro';
import { AtDivider } from 'taro-ui';
import './index.scss';

const Divider = (props: { desc?: string }) => {
  const { desc = 'no more' } = props;
  return <AtDivider content={desc} fontColor='#f5f5f5' lineColor='#f5f5f5' />;
};
export default Divider;
