import Taro, { useEffect, useMemo } from '@tarojs/taro';
import { AtNavBar } from 'taro-ui';
import { View, Block, Image } from '@tarojs/components';
import { AtDivider } from 'taro-ui';
import { useSelector, useDispatch } from '@tarojs/redux';
import '../index.scss';

const GoodsList = () => {
  const { ccowns } = useSelector((state) => state.myvip);
  const dispatch = useDispatch();
  const formatList = useMemo(() => {
    const { list } = ccowns;
    return list;
  }, [ccowns.list]);
  const handleChooseGoods = (opt) => {
    dispatch({ type: 'myvip/updatePageInfo', payload: { type: 'goods', data: opt } });
  };
  useEffect(() => {
    dispatch({ type: 'myvip/getMyowns' });
  }, []);

  return (
    <View className='myvip-wrap'>
      <View className='at-row at-row--wrap goods-list-con'>
        {formatList &&
          formatList.map((item, index) => {
            const { id, title, gpath } = item;
            return (
              <View className='at-col at-col-6 goods-con' key={id}>
                <View className='goods-con-mid' onClick={() => handleChooseGoods(item)}>
                  <Image mode='aspectFit' style='width: 100%;height: 100%;' src={gpath} />
                </View>
                <View className='goods-con-buttom text2line' onClick={() => handleChooseGoods(item)}>
                  {title}
                </View>
              </View>
            );
          })}
      </View>
      {formatList && formatList.length === 0 && <AtDivider fontColor='#c0c0c0' lineColor='#c0c0c0' fontSize='26' content='暂无更多' />}
    </View>
  );
};

export default GoodsList;
