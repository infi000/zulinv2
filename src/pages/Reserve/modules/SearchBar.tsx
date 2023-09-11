import Taro, { useState } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { AtSearchBar } from 'taro-ui';
import '../index.scss';

const SearchBar = () => {
  const [searchVal,setSearchVal] = useState('');
  const onChange = (text) => {
    setSearchVal(text);
  };
  const onClick = (text) => {
    console.log(searchVal);
    Taro.navigateTo({ url: '/pages/SearchRes/index?key=' + searchVal +'&title=' + searchVal});
  };
  return <AtSearchBar value={searchVal} onChange={onChange} onActionClick={onClick} />;
};

export default SearchBar;
