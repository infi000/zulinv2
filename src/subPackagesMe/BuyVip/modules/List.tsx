import Taro from '@tarojs/taro';
import { View, Block, ScrollView, Image } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { AtDivider } from 'taro-ui';
import SoldOut from '@/components/SoldOut';
import '../index.scss';

const { useMemo } = Taro;

const List = () => {
  const { goodsData, listScroll } = useSelector((state) => state.ConsignmentCreate);
  const dispatch = useDispatch();
  const formatList = useMemo(() => {
    const { goods } = goodsData;
    return goods;
  }, [goodsData.goods]);
  const handleChooseGoods = (opt) => {
    const { id, issale, title } = opt;
    // if (issale === '-1') {
    //   return;
    // }
    try {
      Taro.navigateTo({ url: '/subPackages/ConsignmentShow/index?gid=' + id + '&title=' + title });
    } catch (error) {
      Taro.navigateTo({ url: '/subPackages/ConsignmentShow/index?gid=' + id + '&title=西塔科学探索俱乐部' });
    }
  };
  return (
    <View className='listgoods-wrap' style={{ 'paddingBottom': '200px' }}>
      <View>
        <View className='at-row at-row--wrap goods-list-con'>
          {formatList &&
            formatList.map((item, index) => {
              const { id, title, sale, thumbinal, price, issale } = item;
              return (
                <View className='at-col at-col-6 goods-con' key={id + index}>
                  <View className='goods-con-mid' onClick={() => handleChooseGoods({ id: id, issale: issale, title })}>
                    {issale === '-1' && (
                      <View className='soldout-con'>
                        <SoldOut />
                      </View>
                    )}
                    <Image mode='aspectFit' style='width: 100%;height: 100%;' src={thumbinal} />
                  </View>
                  <View className='at-row at-row__justify--between goods-con-top'>
                    <View className='at-col at-col-5 goods-price'>¥{price}</View>
                    <View className='at-col at-col-5 goods-saler'>{sale}详情</View>
                  </View>
                  <View className='goods-con-buttom text2line' onClick={() => handleChooseGoods({ id: id, issale: issale })}>
                    {title}
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
