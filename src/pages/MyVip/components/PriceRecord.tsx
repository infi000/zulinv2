// import Taro from '@tarojs/taro';
import Taro, { useRouter } from '@tarojs/taro';
import { AtNavBar } from 'taro-ui';
import { View, ScrollView } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { isArray, toNumber } from 'lodash';
import '../index.scss';

interface IProps {
    list:Array<any>;
    title:string;
    onBack:() =>any;
}
/**
 * 商品展示
 */
const PriceRecord = (props:IProps) => {
    const { list = [],title='', onBack=()=>{} } = props;
  return (
    <View className='buys-wrap'>
      <AtNavBar color='#000' title={title} leftText='返回' onClickLeftIcon={onBack}   fixed border />
      <View className='goodsshow-con goods-sale-con'>
        <ScrollView
          scrollY
          scrollWithAnimation
          scrollTop={0}
          style={{ height: '100%' }}
          lowerThreshold={50}
          refresherEnabled
          refresherThreshold={20}
        >
          <View className='goods-sale-min goods-sale-mid'>
            {list && list.length > 0 &&
              list.map((item) => {
                const { create, id, price } = item;
                return (
                  <View key={id} className='at-row at-row__justify--between goods-sale-record-con'>
                    <View className='at-col at-col-4 goods-sale-record-l'>¥{price}</View>
                    <View className='at-col at-col-4 goods-sale-record-m '></View>
                    <View className='at-col at-col-4 goods-sale-record-r'>{create}</View>
                  </View>
                );
              })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default PriceRecord;
