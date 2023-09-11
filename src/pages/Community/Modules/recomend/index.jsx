import Taro, { Component,useEffect } from '@tarojs/taro'
import { View, ScrollView, Image, Text } from '@tarojs/components'

import './index.scss'

import { getList } from '../../services';

import { AtIcon, AtAvatar } from 'taro-ui'
const img2 = require('../mock/img/touxiang2.jpg')

let ImageLoadList = []
export default class Recomend extends Component {

  constructor() {
    // super(this.props)
    this.state.goodsLeft = []
    this.state.goodsRight = []
    this.state.ImageLoadList = []
    this.state.imgWidth = 0
    this.state.list = []
    this.state.pageSize = 10
    this.state.page = 1
    this.state.cid = 0
  }
  // state = {
  //   goodsLeft: [],
  //   goodsRight: [],
  //   ImageLoadList: [],
  //   imgWidth: 0,
  //   list: [],
  //   pageSize: 20,
  //   page: 1,
  //   cid: 0
  // }

  componentWillMount() {
    Taro.getSystemInfo({
      success: (res => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.5;

        this.setState({
          imgWidth
        })
      })
    })

    this.setState({
      cid: this.props.cid
    })
    this.getList(this.props.cid);
  }

  shouldComponentUpdate(a, b){
    

    // if(a.cid == this.state.cid){
    //   console.log("aaaaaaa",a)
    // console.log("bbbbbbb",b)
    //   return true;
    // }
  }

   getList= async (id) => {
    let that = this;
    await getList({ page: this.state.page, page_size: this.state.pageSize, community_id: id }).then((res) => {
      for(let index in res.list){
        // console.log(index);
        res.list[index]['image'] = img2;
      }
      console.log("abcbcbcbcbcbcb",res)
      if(this.state.list.length>0){
        console.log(111122222);
      }
      that.setState({
        list: res.list
      })
    });
  }

  

  onImageLoad = (e) => {
    // console.log(e.currentTarget.id)
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.state.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    //初始化ImageLoadList数据
    ImageLoadList.push({
      id: parseInt(e.currentTarget.id),
      height: imgHeight,
    })
    //载入全部的图片进入ImageLoadList数组，若数量和goodsList中相等，进入图片排序函数
    if (ImageLoadList.length === this.state.list.length) {
      this.handleImageLoad(ImageLoadList)
    }
    // console.log(ImageLoadList)
  }
  handleImageLoad = (ImageLoadList) => {
    // console.log('hello', ImageLoadList)
    //对无序的列表进行排序
    for (let i = 0; i < ImageLoadList.length - 1; i++)
      for (let j = 0; j < ImageLoadList.length - i - 1; j++) {
        if (ImageLoadList[j].id > ImageLoadList[j + 1].id) {
          let temp = ImageLoadList[j]
          ImageLoadList[j] = ImageLoadList[j + 1]
          ImageLoadList[j + 1] = temp
        }
      }
    //现在的列表在goodList的基础上，多了height属性
    // console.log('ImageLoadList', ImageLoadList);
    //为现在的列表添加value值

    for (let i = 0; i < this.state.list.length; i++) {
      ImageLoadList[i].value = this.state.list[i].title
      ImageLoadList[i].image = this.state.list[i].image
      ImageLoadList[i].id = this.state.list[i].id
      ImageLoadList[i].community_id = this.state.list[i].community_id
      // console.log('ImageLoadList[i].height', ImageLoadList[i].height)
      ImageLoadList[i].imgStyle = { height: ImageLoadList[i].height + 'rpx' }

    }
    // console.log('ImageLoadList', ImageLoadList);
    //对现在的列表进行操作
    let leftHeight = 0;
    let rightHeight = 0;
    let left = []
    let right = []
    //遍历数组
    for (let i = 0; i < ImageLoadList.length; i++) {
      // console.log('左边的高度', leftHeight, '右边边的高度', rightHeight)
      if (leftHeight <= rightHeight) {
        // console.log('第', i + 1, '张放左边了')
        left.push(ImageLoadList[i])
        leftHeight += ImageLoadList[i].height
        // console.log('left', left);
      } else {
        // console.log('第', i + 1, '张放右边了')
        right.push(ImageLoadList[i])
        rightHeight += ImageLoadList[i].height
        // console.log('right', right);
      }
    }
    this.setState({
      goodsRight: right,
      goodsLeft: left
    }, () => {
      // console.log(this.state);
    })
  }

  dumpDetailPage(event) {
    let id = event.currentTarget.dataset.id;
    // 跳转详情页
    Taro.navigateTo({
      url: "/pages/CommunityDetail/index?id="+id
    });
  }

  render() {
    const { goodsRight, goodsLeft } = this.state
    // console.log(this.state)
    // console.log("props", this.state.list);
    // console.log("goodsRight", goodsRight)
    // console.log("zaaaaa", this.props.list.list)
    return (
      <View className={'goods'}>
        <View style={{ display: 'none' }}>
          {
            this.state.list.map((item, index) => {
              return (
                <Image key={item.id} onLoad={this.onImageLoad} id={index} src={item.image}></Image>
              )
            })
          }
        </View>

        <ScrollView>
          {
            <View className={'goods-left'}>
              {
                goodsLeft.map((item, index) => {
                  return (
                    <View key={item.id} className={'goods-item'} data-id={item.id} onClick={this.dumpDetailPage.bind()}>
                      <Image src={item.image} className={'goods-img'} style={item.imgStyle} id={index}
                        mode='widthFix' />
                      <View className={'goods-name'}>
                        <View className='title'>{item.value}</View>
                        <View className='user'>
                          <View className='user-info'>
                            <Image className='user-avatar' src={item.image}></Image>
                            <Text className='user-name'>nickname</Text>
                          </View>
                          <View className='user-zan'>
                            {/* <AtIcon value='heart' size='16'></AtIcon>
                            <Text className='user-name'>401</Text> */}
                          </View>
                        </View>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          }
        </ScrollView>

        <ScrollView>
          {
            <View className={'goods-right'}>
              {
                goodsRight.map((item, index) => {
                  return (
                    <View key={item.id} className={'goods-item'} data-id={item.value} onClick={this.dumpDetailPage.bind()}>
                      <Image src={item.image} className={'goods-img'} style={item.imgStyle} id={index}
                        mode='widthFix' />
                      <View className={'goods-name'}>
                        <View className='title'>{item.value}</View>
                        <View className='user'>
                          <View className='user-info'>
                            <Image className='user-avatar' src={item.image}></Image>
                            <Text className='user-name'>nickname</Text>
                          </View>
                          <View className='user-zan'>
                            {/* <AtIcon value='heart' size='16'></AtIcon>
                            <Text className='user-name'>401</Text> */}
                          </View>
                        </View>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          }
        </ScrollView>

      </View>
    )

  }
}