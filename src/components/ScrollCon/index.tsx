import Taro from '@tarojs/taro';
import { View, Block, ScrollView } from '@tarojs/components';
import './index.scss';

interface IProps {
    height?: string;
    children?: any;
    onScrollBottom?: (params: any) => any;
}

const ScrollCon = (props: IProps) => {
  const { height = '1080px', onScrollBottom } = props;

  return (
    <ScrollView
      className='scroll-wrap'
      style={{height:height}}
      scrollY
      scrollWithAnimation
      lowerThreshold={100}
      onScrollToLower={onScrollBottom}
    >
      {props.children}
    </ScrollView>
  );
};

export default ScrollCon;
