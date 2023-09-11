import Taro, { useDidShow, useMemo } from '@tarojs/taro';
import { View, Block, ScrollView } from '@tarojs/components';
import GoodsList from '@/components/GoodsList';
import { useSelector, useDispatch } from '@tarojs/redux';
import { searchGoods,getClassifyGoods } from './services';
import './index.scss';

const { useRouter, useEffect, useState } = Taro;
const PAGE_LEN = 1000;
const SearchRes = () => {
  const router = useRouter();
  const [formatList, setFormatList] = useState([]);
  // const [offset, setOffset] = useState(0);
  useDidShow(() => {
    const { params } = router;
    const { from } = params;
    if(from === 'sortpage'){
      const { cid ,key } = params;
      getClassifyGoods({title:key, cid, offset: 0, count: PAGE_LEN }).then((d) => {
        const goods = d.goods;
        setFormatList(goods || []);
      });
      Taro.setNavigationBarTitle({
        title: key || '西塔科学探索俱乐部',
      });
    }else{
      const { key,title } = params;
      searchGoods({ key, offset: 0, count: PAGE_LEN }).then((d) => {
        const goods = d.goods;
        setFormatList(goods || []);
      });
      Taro.setNavigationBarTitle({
        title: title || '西塔科学探索俱乐部',
      });
    }
   

  });
  const onScrollToLower = (e) => {
    console.log('触底了');
    // dispatch({ type: 'goodGoods/getPageGoods'});
  };
  return (
    <View className='list-wrap' >
      <ScrollView scrollY={true} scrollWithAnimation style={{ height: '100%' }} onScrollToLower={onScrollToLower}> 
        <GoodsList list={formatList} />
      </ScrollView>
    </View>
  );
};

export default SearchRes;
