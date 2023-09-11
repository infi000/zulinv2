import Taro, { useRouter } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { isEmpty, showToast } from '@/utils/util';
import '../index.scss';

const { useState, useEffect, useMemo } = Taro;
const defaultParams = {
  price: '',
  size: '',
  color: '',
  num: 1,
};
interface IProps {
  color: string[];
  groupprice: string[];
  size: string[];
  handleAdd: (params: { price: string; size: string; num: number }) => void;
  handleCancel: () => void;
}
const SelecotModal = (props: IProps) => {
  const { color, groupprice, size, handleAdd, handleCancel } = props;
  console.log('props', props);
  const [formParams, setFormParams] = useState({ ...defaultParams });
  const handleUpdateSize = (text: string) => {
    setFormParams((opt) => {
      opt.size = text;
      return { ...opt };
    });
  };
  const handleUpdateColor = (text: string) => {
    setFormParams((opt) => {
      opt.color = text;
      return { ...opt };
    });
  };
  const handleUpdatePrice = (index: number) => {
    setFormParams((opt) => {
      const price = groupprice[index];
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
    const { price, size, num } = formParams;
    if (isEmpty(size)) {
      showToast('请选择类别');
      return;
    }
    if ( num <= 0) {
      showToast('请选择数量');
      return;
    }
    if (isEmpty(price)) {
      showToast('检查价格是否正确');
      return;
    }
    handleAdd({ price, size, num });
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
            {formParams.size || '-'}
          </View>
        </View>
        <View className='selecotItem at-row at-row--wrap'>
          <View className='at-col at-col-2 selecotTag'> 数量：</View>
          <View className='at-col at-col-10'>
            <View
              className={'selecotBtn'}
              onClick={() => {
                handleUpdateNum(-1);
              }}
            >
              -
            </View>
            <View style={{display:'inline',float:'left',marginRight:'10px'}}>{formParams.num}</View>
            <View
              className={'selecotBtn'}
              onClick={() => {
                handleUpdateNum(1);
              }}
            >
              +
            </View>
          </View>
        </View>
        {/* <View className='selecotItem at-row at-row--wrap'>
          <View className='at-col at-col-2 selecotTag'> 颜色：</View>
          <View className='at-col at-col-10'>
            {color.map((text: string, index: number) => {
              return (
                <View
                  className={text == formParams.color ? 'selecotBtnChoose' : 'selecotBtn'}
                  key={index}
                  onClick={() => {
                    handleUpdateColor(text);
                  }}
                >
                  {text}
                </View>
              );
            })}
          </View>
        </View> */}
        <View className='selecotItem at-row at-row--wrap'>
          <View className='at-col at-col-2 selecotTag'> 类别：</View>
          <View className='at-col at-col-10'>
            {size.map((text: string, index: number) => {
              return (
                <View
                  className={text == formParams.size ? 'selecotBtnChoose' : 'selecotBtn'}
                  key={index}
                  onClick={() => {
                    handleUpdateSize(text);
                    handleUpdatePrice(index);
                  }}
                >
                  {text}
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
