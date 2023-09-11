import Taro, { useRouter } from '@tarojs/taro';
import { View, WebView } from '@tarojs/components';

const Protocol = () => {
    const router = useRouter();

    return (
        <View>
            <WebView src={router.params.url}></WebView>
        </View>
    );
}

export default Protocol