
import Taro, {useCallback} from '@tarojs/taro';
import  { AtTabBar } from 'taro-ui';
import { Block } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'
import { ROUTER_MAP } from '@/router/index';
// import * as app from '../../utils/app';


export default () => {
  const {nav, currentNavIndex} = useSelector(state => state.tabbar)
  const dispatch = useDispatch();
  const onClick = useCallback((tab) => {
    if (nav && nav.length >= tab) {
      const currTab = nav[tab];
      console.log(tab, currTab)
      dispatch({type: 'tabbar/updateCurrentNavIndex', payload: tab})
    }
  }, [nav]);
  return <Block>
      <AtTabBar
        className='my-tab-bar'
        fixed
        current={currentNavIndex || 0}
        fontSize={10}
        iconSize={26}
        onClick={onClick}
        backgroundColor='#fff'
        selectedColor='#000'
        color='#dbdbdb'
        tabList={nav}
      />
  </Block>
}
