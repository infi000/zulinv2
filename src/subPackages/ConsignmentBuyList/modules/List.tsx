import Taro from '@tarojs/taro';
import { View, Block, ScrollView, Image } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { AtDivider } from 'taro-ui';
import SoldOut from '@/components/SoldOut';
import '../index.scss';

const { useMemo } = Taro;

const List = () => {
  const { goodsData, listScroll } = useSelector((state) => state.ConsignmentBuyList);
  const dispatch = useDispatch();
  const formatList = useMemo(() => {
    const { goods } = goodsData;
    return goods;
  }, [goodsData.goods]);
  const handleChooseGoods = (opt) => {
    const { id, title, orderid } = opt;
    try {
      Taro.navigateTo({ url: '/subPackages/ConsignmentShow/index?orderid='+orderid+'&gid=' + id + '&title=' + title });
    } catch (error) {
      Taro.navigateTo({ url: '/subPackages/ConsignmentShow/index?orderid='+orderid+'&gid=' + id + '&title=西塔科学探索俱乐部' });
    }
  };
  return (
    <View className='listgoods-wrap' style={{ 'paddingBottom': '200px' }}>
      <View>
        <View className='at-row at-row--wrap goods-list-con'>
          {formatList &&
            formatList.map((item, index) => {
              const { id, jgid, jgtitle, orderid, thumbinal, price, issale, ispay } = item;
              return (
                <View className='at-col at-col-6 goods-con' key={id + index}>
                  <View className='goods-con-mid' onClick={() => handleChooseGoods({ id: jgid, issale: issale, title:jgtitle, orderid: id })}>
                    {issale === '-1' && (
                      <View className='soldout-con'>
                        <SoldOut />
                      </View>
                    )}
                    <Image mode='aspectFit' style='width: 100%;height: 100%;' src={thumbinal} />
                  </View>
                  <View className='at-row at-row__justify--between goods-con-top'>
                    <View className='at-col at-col-3 goods-price'>¥{price}</View>
                    { ispay === '0' ? 
                     <View className='at-col at-col-3 goods-saler'>去付款</View>
                     : <View className='at-col at-col-3 goods-saler'>已付款</View>
                  }
                  </View>
                </View>
              );
            })}
        </View>
        {formatList && formatList.length === 0 && <AtDivider fontColor='#c0c0c0' lineColor='#c0c0c0' fontSize='26' content='暂无更多' />}
      </View>
    </View>
  );
};

export default List;
