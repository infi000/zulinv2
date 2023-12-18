/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-12-02 20:24:37
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-05 00:15:53
 * @FilePath: /zulinv2/src/subPackages/Paidui/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect,useDidShow } from '@tarojs/taro';
import { View, ScrollView, Image } from '@tarojs/components';
import { AtList, AtListItem, AtCard } from 'taro-ui'
import { HOST } from '@/config/api';
import './index.scss';
import { getccCard } from './services';
import { ImgError } from '@/static/images';

const Goupiao = () => {
    const [ccList, setCcList] = useState([]);


  const handleClickItem = (opt:any) => {
    const cardid = opt.cardid;
    Taro.navigateTo({ url: '/pages/GoupiaoDetail/index?cid=' + cardid});
  };
    useEffect(() => {
        getccCard({}).then(d => {
          const { cards } = d;
          setCcList(cards);
        })
      }, [])
console.log('ccList', ccList);
    return (
        <View className='Goupiao-warp'>
            {
                ccList.map((item: any) => {
                  const { id, thumbinal } = item;
                    return <Image style={{ width: '100%'}}  src={ thumbinal || ImgError } mode="widthFix"  onClick={ () => handleClickItem({ cardid: id, }) }/>
                })
            }
        </View>
    );
}

export default Goupiao;