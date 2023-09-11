import Taro, { useEffect } from '@tarojs/taro';
import { View, Checkbox, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { AtList, AtListItem } from 'taro-ui';
import { useCheckBoxList } from '@/utils/hooks';
import './index.scss';
import { isArray } from 'lodash';

const { useState, useEffect } = Taro;

const Collect = () => {
  const { favoriteList = { total: 0, list: [] } } = useSelector((state) => state.collect);
  const dispatch = useDispatch();
  const { handleSelectedAll, handleSelected, isSelectedAll, checkBoxList, checkedItem } = useCheckBoxList(favoriteList.list);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const handleEdit = (params) => {
    setIsEdit(params);
  };
  const handleDel = () => {
    let res = [];
    if(checkedItem.length>0 && isArray(checkedItem)){
      res = checkedItem.map((item) => item.goodid)
    }
    dispatch({ type: 'collect/delFav', params: { gids: res.join(",") } });
    handleEdit(false);
    handleSelectedAll(false);
  };
  const handleGoto = (item) => {
    const { goodid } = item;
    
    Taro.navigateTo({ url: '/pages/GoodsShow/index?gid=' + goodid });
  };
  useEffect(() => {
    dispatch({ type: 'collect/init' });
    dispatch({ type: 'collect/geFavorite' });
  }, []);
  return (
    <View className='collect-wrap'>
      <AtList hasBorder={false}>
        {checkBoxList.map((item, index: number) => {
          const { title, price, fpath, checked, id } = item;
          return (
            <View className='at-row  at-row__align--center' key={id}>
              {isEdit && (
                <View className='at-col at-col-1 at-col--auto'>
                  <Checkbox
                    className='radio-list__radio'
                    value={id}
                    checked={checked}
                    onClick={() => {
                      handleSelected(index);
                    }}
                  ></Checkbox>
                </View>
              )}
              <View className='at-col'>
                <AtListItem
                  title={title}
                  note={`¥${price}`}
                  thumb={fpath}
                  onClick={() => {
                    if (isEdit) {
                      handleSelected(index);
                    } else {
                      handleGoto(item);
                    }
                  }}
                ></AtListItem>
              </View>
            </View>
          );
        })}
      </AtList>
      <View className='at-row edit-con'>
        {!isEdit && (
          <View
            className='at-col__offset-10 at-col-2 edit-btn'
            onClick={() => {
              handleEdit(true);
            }}
          >
            编辑
          </View>
        )}
        {isEdit && (
          <Block>
            <View className='at-col at-col-3 all-btn'>
              <Checkbox value='选中' checked={isSelectedAll} onClick={() => handleSelectedAll()}>
                全选
              </Checkbox>
            </View>
            <View className='at-col at-col-2 at-col__offset-5 del-btn' onClick={handleDel}>
              删除
            </View>
            <View
              className='at-col at-col-2 cancel-btn'
              onClick={() => {
                handleEdit(false);
                handleSelectedAll(false);
              }}
            >
              取消
            </View>
          </Block>
        )}
      </View>
    </View>
  );
};

export default Collect;
