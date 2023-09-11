import Taro, { useMemo } from '@tarojs/taro';
import { View, WebView } from '@tarojs/components';
import { useSelector } from '@tarojs/redux';



const Choujiang = () => {
  const {openid} = useSelector((state) => state.main);
  const weburl = useMemo(() => {
    return openid ? `https://www.tangguostore.com/index.php/MiniApi/User/lottery/openid/${openid}.html` : null;
  }, [openid])
  return (
    <View>
      {
        weburl ?   <WebView src={weburl}></WebView>  : <View style={{padding:'130px 0 ',textAlign:'center'}}>未获取到用户信息，请登陆后参与抽奖</View>
      }
    </View>
  );
};

export default Choujiang;
