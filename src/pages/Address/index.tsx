import Taro, { useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import EditAddress from './modules/EditAddress';
import ListAddress from './modules/ListAddress';
import { useSelector, useDispatch } from '@tarojs/redux';
import './index.scss';

const Address = () => {
  const router = useRouter();
  const { params } = router;
  const { from } = params;
  const { modal } = useSelector((state) => state.address);
  return <View>{modal.show ? <EditAddress /> : <ListAddress from={from} />}</View>;
  // return <View> <EditAddress /></View>;
};

export default Address;
