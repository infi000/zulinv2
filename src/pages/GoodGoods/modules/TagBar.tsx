import Taro from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { AtTabs, AtTabsPane, AtGrid } from 'taro-ui';
import '../index.scss';

const { useState, useEffect, useMemo } = Taro;
const DEFAULT_TAG = [
  {
    title: '推荐',
    stype: '1', // stype不为空时，商品搜索传参{stype:xx}。type为空传参{ctype:xxx}
  },
  {
    title: '最热',
    stype: '2',
  },
  {
    title: '最新',
    stype: '3',
  },
];

const TagBar = (props) => {
  const  { style ={} } = props;
  const [tabCurrent, SetTabCurrent] = useState(0);
  const { allCtypeList,goodsData } = useSelector((state) => state.goodGoods);
  const dispatch = useDispatch();
  const formatList = () => {
    if (allCtypeList && allCtypeList.length > 0) {
      return DEFAULT_TAG.concat(
        allCtypeList.filter(item=> item.c_type).map((item) => {
          const { c_type: title } = item;
          item.title = title;
          return item;
        })
      );
    }
    return DEFAULT_TAG;
  };
  const handleClickTab = (index) => {
    SetTabCurrent(index);
  };
  // 根据tab选项调接口
  useEffect(() => {
    const item = formatList()[tabCurrent];
    const { stype, title } = item;
    const payload = stype ? { stype } : { ctype: title };
    dispatch({ type: 'goodGoods/updateGoodsDataParams', payload });
    dispatch({ type: 'goodGoods/getSearchGoods' });
  }, [tabCurrent]);

  useEffect(() => {
    dispatch({ type: 'goodGoods/getAllCtype' });
  }, []);
  return (
    <View className='tagbar-wrap' style={style}>
      <AtTabs current={tabCurrent} scroll tabList={formatList()} onClick={handleClickTab}></AtTabs>
    </View>
  );
};

export default TagBar;
