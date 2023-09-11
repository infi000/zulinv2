import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Block, Image } from '@tarojs/components';
import { getClassifySearch } from '../services';
import { isArray } from 'lodash';
import '../index.scss';

const Area = () => {
  const handlePageTo = ({id,title}) => {
    Taro.navigateTo({ url: '/pages/SortPage/index?cid=' + id +'&title=' + title});
  };
  const [areaList, setAreaList]: [any[], any] = useState([]);
  useEffect(() => {
    getClassifySearch({ ctype: 2 }).then((d) => {
      const arr = isArray(d) ? d : [];
      setAreaList(arr);
    });
  }, []);
  return areaList ? (
    <View className='area-wrap'>
      <View className='at-row'>
        <View className='at-col at-col-6 area-l'>
          {areaList[0] && (
            <Image
              mode='aspectFill'
              style='width: 100%;height: 100%;'
              src={areaList[0].fpath}
              onClick={() => {
                handlePageTo(areaList[0]);
              }}
            />
          )}
        </View>
        <View className='at-col at-col-6'>
          <View className='at-row at-row--wrap'>
            <View className='at-col at-col-12  area-r-top'>
              {areaList[1] && (
                <Image
                  mode='aspectFill'
                  style='width: 100%;height: 100%;'
                  src={areaList[1].fpath}
                  onClick={() => {
                    handlePageTo(areaList[1]);
                  }}
                />
              )}
            </View>
            <View className='at-col at-col-12 area-r-bottom'>
              {areaList[2] && (
                <Image
                  mode='aspectFill'
                  style='width: 100%;height: 100%;'
                  src={areaList[2].fpath}
                  onClick={() => {
                    handlePageTo(areaList[2]);
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  ) : null;
};

export default Area;
