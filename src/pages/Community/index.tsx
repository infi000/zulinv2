import Taro, { useState, useEffect, useDidShow } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtTabs, AtTabsPane, AtFab, AtActionSheet, AtActionSheetItem } from 'taro-ui'

import './index.scss';
import "taro-ui/dist/style/components/fab.scss";
import "taro-ui/dist/style/components/icon.scss";
import { getChannel } from './services';
import Recomend from './Modules/recomenda';

import { csend } from '@/static/images';

const Community = () => {

  const [sendSheetStatus, setSendSheetStatus] = useState<any>(false);

  const [currentChildTab, setCurrentChildTab] = useState(0);
  const [currentChildTabData, setCurrentChildTabData] = useState<any>([]);

  const handleClickChildTab = (value) => {
    setCurrentChildTab(value);
  }

  const channel = () => {
    getChannel().then((result) => {
      result = result.list;
      for (let index in result) {
        result[index]['title'] = result[index]['name'];
      }
      setCurrentChildTabData(result)
    })
  }
  useEffect(() => {
    channel();
    console.log('useEffect');
  }, [])
  // useDidShow(()=>{
  //   channel();
  // })
  // 发布新内容
  const dumpSendPage = () => {
    let cid = currentChildTabData[currentChildTab].id;
    sendSheetStatusClose();
    Taro.navigateTo({
      url: "/pages/Community/Add/index?cid=" + cid
    });
  }

  const sendSheetStatusClose = () => {
    setSendSheetStatus(false);
  }

  const openSendSheetStatus = () => {
    setSendSheetStatus(true);
  }

  const sendVideo = () => {
    try {
      let cid = currentChildTabData[currentChildTab].id;
      
      Taro.chooseMedia({
        count: 1,
        mediaType: ['video'],
        sourceType: ['album'],
        sizeType: ['original'],
        success(res) {
          // const tempFiles = res.tempFiles;
          console.log(res)
          sendSheetStatusClose();
          Taro.navigateTo({
            url: "/pages/Community/AddVideo/index?cid=" + cid+"&video_path="+res.tempFiles[0].tempFilePath
          });
        },
        fail: (res) => {
          console.log('Taro.chooseMedia fail message: ', res);
        }
      });
    } catch (e) {
      console.log('error :', e);
    }
  }

  return (
    <View className='comunity-warp'>
      <View className='header'>
        <AtTabs
          current={currentChildTab}
          scroll
          tabList={currentChildTabData}
          onClick={handleClickChildTab}>
          {currentChildTabData.map((item, i) => (
            <AtTabsPane class='community-font-color' key={item.id} current={currentChildTab} index={i}>
              {/* <View > */}
              <Recomend key={"Recomend_" + item.id} cid={item.id}></Recomend>
              {/* </View> */}
            </AtTabsPane>
          ))}
        </AtTabs>
      </View>
      <View className='content'>

      </View>
      <View className='fab-btn'>
        <AtFab onClick={openSendSheetStatus}>
          {/* <Text className='at-fab__icon at-icon at-icon-add'></Text> */}
          <Image src={csend} style={"width:30px;height:31px"}></Image>
        </AtFab>
      </View>
      <AtActionSheet isOpened={sendSheetStatus} cancelText='取消' title='选择发布图文或视频' onCancel={sendSheetStatusClose} onClose={sendSheetStatusClose}>
        <AtActionSheetItem onClick={dumpSendPage}>
          图文
        </AtActionSheetItem>
        <AtActionSheetItem onClick={sendVideo}>
          视频
        </AtActionSheetItem>
      </AtActionSheet>
    </View>
  );
}

export default Community;