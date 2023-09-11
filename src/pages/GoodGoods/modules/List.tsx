import Taro from '@tarojs/taro';
import { View, Block, ScrollView } from '@tarojs/components';
import GoodsList from '@/components/GoodsList';
import { useSelector, useDispatch } from '@tarojs/redux';
import '../index.scss';

const { useMemo } = Taro;

const List = () => {
  const { goodsData, listScroll } = useSelector((state) => state.goodGoods);
  const dispatch = useDispatch();
  const formatList = useMemo(() => {
    const { goods } = goodsData;
    return goods;
  }, [goodsData.goods]);
  return (
     <View  className='listgoods-wrap' style={{'paddingBottom':'200px'}}>
     <GoodsList list={formatList} />
     </View>
  );
};

export default List;
