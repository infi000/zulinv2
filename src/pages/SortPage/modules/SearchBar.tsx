import Taro, { useState, useRouter } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { AtSearchBar } from 'taro-ui';
import '../index.scss';

const SearchBar = (props:any) => {
  const [searchVal, setSearchVal] = useState('');
  const onChange = (text) => {
    setSearchVal(text);
  };
  const onClick = (text) => {
    Taro.navigateTo({ url: '/pages/SearchRes/index?from=sortpage&cid=' + props.cid + '&key=' + searchVal + '&title=' + searchVal });
  };
  return <AtSearchBar value={searchVal} onChange={onChange} onActionClick={onClick} />;
};

export default SearchBar;
