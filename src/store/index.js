import main from './main';
import tabbar from '@/components/Tabbar/store.ts';
import address from '@/pages/Address/store';
import goodsShow from '@/pages/GoodsShow/store';
import goodGoods from '@/pages/GoodGoods/store';
// import searchRes from '@/pages/SearchRes/store';
import collect from '@/pages/Collect/store';
import order from '@/pages/Order/store';
import myvip from '@/pages/MyVip/store';
import photoWall from '@/pages/PhotoWall/store';
import reserve from '@/pages/Reserve/store';
import lease from '@/pages/Lease/store';
import Consignment from '@/subPackages/Consignment/store';
import ConsignmentShow from '@/subPackages/ConsignmentShow/store';
import ConsignmentBuyList from '@/subPackages/ConsignmentBuyList/store';
import ConsignmentSaleList from '@/subPackages/ConsignmentSaleList/store';
import ConsignmentCreate from '@/subPackages/ConsignmentCreate/store';
import ConsignmentMenu from '@/subPackages/ConsignmentMenu/store';
import UserInfoManage from '@/subPackagesMe/UserInfoManage/store';
import BuyVip from '@/subPackagesMe/BuyVip/store';
import BuyTabi from '@/subPackagesMe/BuyTabi/store';

export default [
  main,tabbar,address,goodsShow,goodGoods,order,collect,myvip,photoWall, reserve, lease, Consignment, ConsignmentShow, ConsignmentBuyList, ConsignmentSaleList, ConsignmentCreate, ConsignmentMenu,UserInfoManage, BuyVip,BuyTabi
]
