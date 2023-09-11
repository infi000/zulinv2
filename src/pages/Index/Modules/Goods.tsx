import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import '../index.scss';
import { dumpByType } from '../services';


const Goods = (props) => {
    const img = "https://heshenghui.zhiheworld.com/images_tmp/goods.png";
    const dump = (e) => {
        let gotype = e.currentTarget.dataset.gotype;
        let title = e.currentTarget.dataset.title;
        let eid = e.currentTarget.dataset.eid;
        let cid = e.currentTarget.dataset.cid;
        let gid = e.currentTarget.dataset.gid;
        dumpByType(gotype, {
            title: title,
            gid: gid,
            cid: cid,
            eid: eid,
        })
    }
    return (
        <View className='index-goods-warp'>
            {props.data.length > 0?(
                props.data.map((item, index) => (
                    <View key={index} className='goods' 
                        data-title={item.title} 
                        data-gotype={item.gtype} 
                        data-eid={item.id}
                        data-cid={item.id}
                        data-gid={item.id}
                        onClick={dump}
                    >
                        <Image className='image' src={item.fpath}  mode="scaleToFill"></Image>
                        <View className='title'>{item.title}</View>
                        <View className='desc'>{item.des}</View>
                        <View className='money'>￥{item.price}</View>
                    </View>
                ))
            ):''}
        </View>
    );
}

export default Goods;