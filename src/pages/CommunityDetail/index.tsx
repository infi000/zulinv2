import Taro, { useState, useRouter, useEffect } from '@tarojs/taro';
import { View, Image, Text, Video } from '@tarojs/components';
import { AtAvatar, AtIcon, AtFloatLayout, AtTextarea, AtButton } from 'taro-ui'


import './index.scss';
import Comment from './Modules/Comment';
import { getDetail, reply } from './services';

const CommunityDetail = () => {

  const [title, setTitle] = useState("");
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState("");
  const [articleDate, setArticleDate] = useState("");
  const [comments, setComments] = useState<any>([]);
  const [content, setContent] = useState<any>();
  const [images, setImages] = useState<any>([]);
  const [image, setImage] = useState<any>([]);
  const [dumpUrl, setDumpUrl] = useState<any>('');
  const [type, setType] = useState<any>('image');

  const [postId, setPostId] = useState<any>(0);
  const [fatherId, setFatherId] = useState<any>();

  const [commentDetail, setCommentDetail] = useState<any>([]);
  const commentChange = (value, event) => {
    setCommentDetail(value);
  }

  const router = useRouter();

  const [atFloatLayoutStatus, setAtFloatLayoutStatus] = useState(false);
  const changeAtFloatLayoutStatus = (status) => {
    setAtFloatLayoutStatus(true);
  }

  // 回复弹窗关闭事件
  const atFloatLayoutOnClose = () => {
    // 初始化当前回复用户临时信息
    setAtFloatLayoutStatus(false);
  }

  const imgClick = (imgs, img) => {
    Taro.previewImage({
      // 所有图片
      urls: imgs,
      // 当前图片
      current: img,
    });
  }

  const send = () => {
    console.log("send:", title, commentDetail)
    reply({
      content: commentDetail,
      post_id: parseInt(postId),
      // father_id: fatherId
    }).then(res => {

      getDetailData();
    })

    setAtFloatLayoutStatus(false)
  }

  const getDetailData = async () => {
    let articleId = router.params.id
    console.log("articleId", articleId);
    await getDetail(articleId).then((res) => {
      console.log("帖子详情：", res);
      setTitle(res.title)
      setNickname(res.user.nickName)
      setAvatar(res.user.avatarUrl)
      setArticleDate(res.created_at)
      setContent(res.content)
      setComments(res.reply);
      setPostId(res.id);
      setImage(res.image);

      if (res.thumb_image) {
        setDumpUrl(res.thumb_image)
      }

      let imgPath = res.image;
      let suffix = imgPath.substring(imgPath.lastIndexOf(".") + 1);
      if (suffix == 'mp4') {
        setType('video');
      } else {
        setType('image');
      }

      if (res.images) {
        res.images = res.images.split(",");
        setImages(res.images.length > 0 ? res.images : []);
      } else {
        setImages([]);
      }

      // setFatherId(res.father_id)
    });
  }

  useEffect(() => {
    getDetailData();
  }, [])

  const dumpLeaseOrder = (event) => {
    let url = event.currentTarget.dataset.durl;
    // 跳转详情页
    Taro.navigateTo({
      url: url + "&identity=share"
    });
  }

  let c = "<Text className='dump-text' data-durl={image} onClick={dumpLeaseOrder}>点击跳转</Text>"
  return (
    <View className='index'>
      <View className='at-article article'>
        <View className='at-article__h1'>{title}</View>

        <View className='user'>
          <View className='avatar'>
            <AtAvatar circle image={avatar}></AtAvatar>
          </View>
          <View className='at-article__info'>
            <View className='nickname'>{nickname}</View>
            <View className='article-date'>{articleDate}</View>
          </View>
        </View>

        <View className='at-article__p'>
          {content}
          {dumpUrl != '' ? (
            <Text className='dump-text' data-durl={dumpUrl} onClick={dumpLeaseOrder}>点击跳转</Text>
          ) : ''}
        </View>
        <View className='at-article__p'>
          {type == 'video' ? (
            <Video
              // className='at-col-12 recomenda-img'
              style={"width:100%;"}
              src={image}
              controls={true}
              autoplay={true}
              initialTime={0}
              id='video'
              loop={true}
              muted={true}
              showMuteBtn={true}
            />
          ) : ''}
          {images.length > 0 && (
            <View
              className={`${images.length == 4 ? "noWarp" : "imgs"
                }`}
            >
              {images.map((items, index) => {
                return (
                  <Image
                    mode='aspectFill'
                    key={index}
                    onClick={() => imgClick(images, items)}
                    src={items}
                    className={`${images.length == 1 ? "oneImg" : "imgView"
                      }`}
                  ></Image>
                );
              })}
            </View>
          )}
        </View>
        <View className='reply'>
          <View onClick={changeAtFloatLayoutStatus}>
            <AtIcon className='message-icon' value='message' size='20' color='#999'></AtIcon>
            回复
          </View>
        </View>
      </View>
      <Comment datalist={comments} getDetail={getDetailData}></Comment>
      <AtFloatLayout isOpened={atFloatLayoutStatus} onClose={atFloatLayoutOnClose} title={"回复：" + nickname}>
        <View className='content'>
          <AtTextarea
            height={300}
            value={commentDetail}
            onChange={commentChange}
            maxLength={400}
            placeholder='请输入回复内容'
          />
        </View>
        <View className='send-btn'>
          <AtButton type='primary' onClick={send}>回复</AtButton>
        </View>
      </AtFloatLayout>
    </View>
  )
}

export default CommunityDetail;