/* eslint-disable no-shadow */

import Taro, { useRouter } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { isEmpty, showToast } from '@/utils/util';
import '../index.scss';
import { get } from 'lodash';


type TTimeItem = {
  t: string // 时间
  c: number // 库存
}

type TPicketItem = {
  d: string // 日期
  times: TTimeItem[]
}
const { useState, useEffect, useMemo } = Taro;
const defaultParams = {
  price: '',
  times: '',
  dates: '',
  num: 1,
};
interface IProps {
  price: string
  pickets: TPicketItem[]
  handleAdd: (params: { price: string; dates: string; times: string; num: number }) => void
  handleCancel: () => void
}
const SelecotModal = (props: IProps) => {
  const { price, pickets, handleAdd, handleCancel } = props;
  const [formParams, setFormParams] = useState({ ...defaultParams });
  const getDT = useMemo(() => {
    let d = [];
    let c = [];
    if(Array.isArray(pickets)){
      d =  pickets.map(item => item.d)
      const {dates} = formParams;
      const target = pickets.find(item => item.d == dates);
      if(target && Array.isArray(target.times)){
        // c = target.times.filter(item => Number(item.c) > 0 ).map(item => item.t)
        c = target.times
      }
    } 
    return {
      dates:d,
      times:c
    } 
  },[JSON.stringify(pickets), JSON.stringify(formParams)])


  console.log('getDT', getDT);
  const handleUpdateTimes = (text: string) => {
    setFormParams((opt) => {
      opt.times = text;
      return { ...opt };
    });
  };
  const handleUpdateDates = (text: string) => {
    setFormParams((opt) => {
      opt.dates = text;
      return { ...opt };
    });
  };
  const handleUpdatePrice = () => {
    setFormParams((opt) => {
      opt.price = price;
      return { ...opt };
    });
  };
  const handleUpdateNum = (type: 1 | -1) => {
    setFormParams((opt) => {
      const { num } = opt;
      const newNum = num + type;
      if (newNum > 0) {
        opt.num = newNum;
      }
      return { ...opt };
    });
  };
  const reset = () => {
    setFormParams(defaultParams);
  };
  const handleSubmit = () => {
    const { price, dates, times, num } = formParams;
    if (isEmpty(price) || isEmpty(dates) || isEmpty(times) || num <= 0) {
      showToast('选择日期，时间');
      return;
    }
    handleAdd({ price, dates, times, num });
    reset();
  };
  console.log('formParams', formParams);
  return (
    <View className='selecotModal'>
      <View className='selecotCon'>
        <View className='selecotItem at-row at-row--wrap'>
          <View className='at-col at-col-2 selecotTag'> 价格：</View>
          <View className='at-col at-col-10'>{formParams.price || '-'}</View>
        </View>
        <View className='selecotItem at-row at-row--wrap'>
          <View className='at-col at-col-2 selecotTag'> 已选：</View>
          <View className='at-col at-col-10'>
            {formParams.dates || '-'} / {formParams.times || '-'}
          </View>
        </View>
        <View className='selecotItem at-row at-row--wrap'>
          <View className='at-col at-col-2 selecotTag'> 数量：</View>
          <View className='at-col at-col-10'>
            {/* <View
              className={'selecotBtn'}
              onClick={() => {
                handleUpdateNum(-1);
              }}
            >
              -
            </View> */}
            <View style={{display:'inline',float:'left',marginRight:'10px'}}>{formParams.num}</View>
            {/* <View
              className={'selecotBtn'}
              onClick={() => {
                handleUpdateNum(1);
              }}
            >
              +
            </View> */}
          </View>
        </View>
        <View className='selecotItem at-row at-row--wrap'>
          <View className='at-col at-col-2 selecotTag'> 日期：</View>
          <View className='at-col at-col-10'>
            {getDT.dates.map((text: string, index: number) => {
              return (
                <View
                  className={text == formParams.dates ? 'selecotBtnChoose' : 'selecotBtn'}
                  key={index}
                  onClick={() => {
                    handleUpdateDates(text);
                    handleUpdateTimes('')
                    handleUpdatePrice()
                  }}
                >
                  {text}
                </View>
              );
            })}
          </View>
        </View>
        <View className='selecotItem at-row at-row--wrap'>
          <View className='at-col at-col-2 selecotTag'> 时间：</View>
          <View className='at-col at-col-10'>
            {getDT.times.map((item: TTimeItem, index: number) => {
              const {c,t} = item;
              const cn = () => {
                if(c == 0 ){
                  return 'disabled'
                }
                if(t == formParams.times){
                  return 'selecotBtnChoose'
                }
                return 'selecotBtn'
              }
              return (
                <View
                  className={cn()}
                  key={index}
                  onClick={() => {
                    if(c == 0){
                      return 
                    }
                    handleUpdateTimes(t);
                    handleUpdatePrice();
                  }}
                >
                  {`${t}${c == 0? '售罄':''}`}
                </View>
              );
            })}
          </View>
        </View>
        <View className='selecotItemBuy'>
          <View className='selecotBtnBuy' onClick={handleSubmit}>
            加入购物车
          </View>
          <View
            className='selecotBtnBack'
            onClick={() => {
              reset();
              handleCancel();
            }}
          >
            取消
          </View>
        </View>
      </View>
    </View>
  );
};

export default SelecotModal;
