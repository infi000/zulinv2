import Taro, { useState, useEffect, useDidShow } from '@tarojs/taro';
import { View, Block, Image } from '@tarojs/components';
import { isArray } from 'lodash';
import '../index.scss';
import { getChoujiangId } from '../services';
import Api from '@/config/api';
import { message } from 'taro-ui';
import { showToast } from '@/utils/util';

const Area = (props:any) => {
  const handlePageTo = (type: string) => {
    if(type === 'jimai'){
      Taro.navigateTo({ url:'/subPackages/Consignment/index' });
    }
    if(type === 'paimai'){
      showToast('建设中！')
    }
  };

  return (
    <View className='area-wrap-2'>
      <View className='at-row at-row--wrap'>
      <View className='at-col at-col-6 area-l'>
                  <Image
                    mode='aspectFill'
                    style='width: 100%;height: 100%;'
                    src={Api.picJimai}
                    onClick={() => {
                      handlePageTo('jimai');
                    }}
                  />
              </View>
              <View className='at-col at-col-6 area-l'>
                  <Image
                    mode='aspectFill'
                    style='width: 100%;height: 100%;'
                    src={Api.picPaimai}
                    onClick={() => {
                      handlePageTo('paimai');
                    }}
                  />
              </View>
      </View>
    </View>
  );
};

export default Area;
