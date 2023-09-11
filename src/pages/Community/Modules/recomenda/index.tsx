import Taro, { useState, useReachBottom, useEffect, useDidShow } from '@tarojs/taro';
import { View, ScrollView, Image, Video } from '@tarojs/components';
import { AtDivider } from 'taro-ui'


import './index.scss';
import "taro-ui/dist/style/components/flex.scss";
import { getList } from '../../services';
const img2 = require('../mock/img/touxiang2.jpg')

const Recomenda = (props) => {

    const pageSize = 20;
    const [listData, setListData] = useState<any>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getListData(props.cid, page);
    }, [])

    // 滑动到底部翻页
    const onScrollToLower = (e) => {
        console.log("onScrollToLoweronScrollToLoweronScrollToLower");
        let _page = page + 1;
        setPage(_page)
        getListData(props.cid, _page);
    }

    const onScroll = (e) => {
        // console.log("onScroll")
        // const scrollHight = Math.ceil(areaList.length/2) * 140;
        // const baseH = 250
        // if (e.target.scrollTop >= scrollHight+baseH) {
        //   if (!tagBarStyle) {
        //     setTagBarStyle({
        //       position: 'fixed',
        //       top: 0,
        //       zIndex: 10,
        //       boxShadow: ' 1rpx 1rpx 10rpx #ccc',
        //       width: '100%',
        //       marginBottom: 0,
        //     });
        //   }
        // } else {
        //   if (tagBarStyle) {
        //     setTagBarStyle(null);
        //   }
        // }
      };

    const getListData = async (comunityId, curpage) => {
        
        await getList({ page: curpage, page_size: pageSize, community_id: comunityId }).then((res) => {
            let _listData = listData as any[]
            for (let index in res.list) {
                let imgPath = res.list[index].image;
                let suffix = imgPath.substring(imgPath.lastIndexOf(".")+1);
                if(suffix == 'mp4'){
                    res.list[index].type = 'video'
                }else{
                    res.list[index].type = 'image'
                }
                
                _listData.push(res.list[index]);
            }
            setListData([..._listData])
        });
    }

    const dumpDetailPage = (event) => {
        let id = event.currentTarget.dataset.id;
        // 跳转详情页
        Taro.navigateTo({
          url: "/pages/CommunityDetail/index?id="+id
        });
      }

    return (
        <View className='recomenda-warp'>
            <ScrollView scrollY={true} scrollWithAnimation style={{ height: '80vh' }} onScroll={onScroll} onScrollToLower={onScrollToLower}>
                <View className='at-row at-row--wrap'>
                    {listData.map((item, index) => (
                        <View key={index} className='at-col at-col-6 recomenda-block' data-id={item.id} onClick={dumpDetailPage}>
                            <View className='recomenda-block-border'>
                                {item.type == 'video'?(
                                    <Video
                                        className='at-col-12 recomenda-img'
                                        style={"width:100%;height:241px"}
                                        src={item.image}
                                        controls={false}
                                        autoplay={true}
                                        initialTime={0}
                                        id='video'
                                        loop={true}
                                        muted={true}
                                        showMuteBtn={true}
                                        objectFit="cover"
                                    />
                                ):(
                                    <Image className='at-col-12 recomenda-img' src={item.image} mode='aspectFill' />
                                )}
                                
                                <View className='recomenda-block-title'>{item.title}</View>
                                <View className='recomenda-block-info'>
                                    <Image className='recomenda-avatar' src={item.user.avatarUrl} mode='aspectFill' />
                                    <View className='recomenda-user'>
                                        <View>{item.user.nickName}</View>
                                        <View className='recomenda-date'>{item.created_at}</View>
                                    </View>
                                    
                                </View>
                            </View>
                        </View>
                    ))
                    }
                </View>
            </ScrollView>
            {listData && listData.length === 0 && <AtDivider fontColor='#c0c0c0' lineColor='#c0c0c0' fontSize='26' content='暂无更多' />}
        </View>
    );
}

export default Recomenda;