import Taro, { useState, useEffect, useDidShow } from '@tarojs/taro';
import { View, Block, Image } from '@tarojs/components';
import { isArray } from 'lodash';
import '../index.scss';
import { getChoujiangId } from '../services';

const Area = (props:any) => {
  const [cjId, setCjId] = useState('');
  const { areaList } = props;
  const handlePageTo = ({ id, title }) => {
    if(id == cjId){
      Taro.navigateTo({ url:'/pages/Choujiang/index' });
      return 
    }
    Taro.navigateTo({ url: '/pages/SortPage/index?cid=' + id + '&title=' + title });
  };
  // const [areaList, setAreaList]: [any[], any] = useState([]);
  // useEffect(() => {
  //   getClassifySearch({ ctype: 2 }).then((d) => {
  //     const arr = isArray(d) ? d : [];
  //     setAreaList(arr);
  //   });
  // }, []);
  useEffect(() => {
    getChoujiangId().then(d => setCjId(d))
  },[])
  return (
    <View className='area-wrap-2'>
      <View className='at-row at-row--wrap'>
        {areaList &&
          isArray(areaList) &&
          areaList.map((item) => {
            return (
              <View className='at-col at-col-6 area-l'>
                  <Image
                    mode='aspectFill'
                    style='width: 100%;height: 100%;'
                    src={item.fpath}
                    onClick={() => {
                      handlePageTo(item);
                    }}
                  />
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default Area;
