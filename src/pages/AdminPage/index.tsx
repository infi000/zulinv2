import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Button, Input, Text, Image } from '@tarojs/components';
import { AtTabs, AtTabsPane, AtInput, AtInputNumber, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtToast } from 'taro-ui';
import { useSelector } from '@tarojs/redux';
import { showToast, showSuccessToast, currentDate } from '@/utils/util';
import {
  getUserCards,
  checkUserCard,
  getBuySearch,
  setCardRemark,
  getUserCardOrders,
  userCardOrderRefund,
} from './services';
import './index.scss';

// Tab 类型
const TAB_LIST = [{ title: '用户查询核销' }, { title: '当日销售记录' }];

// 用户卡数据类型
interface UserCard {
  id?: string;
  cid?: string;  // 卡ID
  cardid?: string;  // 兼容旧字段名
  uid?: string;  // 用户ID
  name?: string;  // 卡片名称
  cardname?: string;  // 兼容旧字段名
  leftcount: number;  // 剩余次数
  totalcount: number;  // 总次数
  expiredate: string;  // 过期日期
  status: string;  // 状态 1=有效，0=已过期
  phone?: string;  // 用户手机号
}

// 用户信息类型
interface UserInfo {
  uid: string;
  nickname: string;
  phone: string;
  avatar: string;
}

// 订单类型
interface Order {
  oid?: string;  // 订单ID
  id?: string;  // 兼容旧字段名
  orderno: string;  // 订单号
  orderid?: string;  // 兼容旧字段名
  createtime: string;  // 创建时间
  total: string;  // 订单金额
  cards?: UserCard[];  // 包含的卡片
  usercards?: UserCard[];  // 兼容旧字段名
}

// 销售记录类型
interface SaleRecord {
  cid: string;
  id: string;
  uid: string;
  cardname: string;
  price: string;
  buytime: string;
  buyername: string;
  buyerphone: string;
  totalpay: string;
  total: string;
  remark: string;
}

const AdminPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const { userInfo } = useSelector((state) => state.main);

  // ============ 用户查询核销模块状态 ============
  const [searchPhone, setSearchPhone] = useState('');
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [userCards, setUserCards] = useState<UserCard[]>([]);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 核销弹窗状态
  const [checkModalOpen, setCheckModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<UserCard | null>(null);
  const [checkNum, setCheckNum] = useState(1);

  // 退款弹窗状态
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [refundAmount, setRefundAmount] = useState('');
  const [cardLeftCounts, setCardLeftCounts] = useState<{ [key: string]: number }>({});

  // ============ 当日销售记录模块状态 ============
  const [saleRecords, setSaleRecords] = useState<SaleRecord[]>([]);
  const [isLoadingSales, setIsLoadingSales] = useState(false);

  // 备注弹窗状态
  const [remarkModalOpen, setRemarkModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<SaleRecord | null>(null);
  const [remarkInput, setRemarkInput] = useState('');

  // ============ 用户查询与核销功能 ============

  // 搜索用户
  const handleSearchUser = async () => {
    if (!searchPhone || !/^1[3456789]\d{9}$/.test(searchPhone)) {
      showToast('请输入正确的手机号');
      return;
    }

    setIsLoading(true);
    try {
      const res = await getUserCards({ phone: searchPhone });
      if (res) {
        setUserData(res.user || null);
        setUserCards(res.cards || []);
        // 同时查询今日订单
        fetchUserOrders();
      }
    } catch (error) {
      console.error('搜索用户失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 获取用户订单
  const fetchUserOrders = async () => {
    try {
      const today = currentDate();
      console.log('正在查询订单，参数：', { odate: today });
      const res = await getUserCardOrders({ odate: today });
      console.log('订单查询响应：', res);
      if (res && res.orders) {
        setUserOrders(res.orders);
      }
    } catch (error) {
      console.error('获取订单失败:', error);
      showToast('获取订单失败');
    }
  };

  // 打开核销弹窗
  const openCheckModal = (card: UserCard) => {
    setSelectedCard(card);
    setCheckNum(1);
    setCheckModalOpen(true);
  };

  // 确认核销 - 使用内联函数避免闭包问题
  const handleConfirmCheck = async (cardData?: UserCard) => {
    console.log('handleConfirmCheck called with:', { cardData, selectedCard, checkNum });

    // 优先使用传入的参数，如果没有则使用状态
    const card = cardData || selectedCard;

    if (!card) {
      console.error('缺少必要数据:', { card, selectedCard });
      showToast('数据不完整，请重新选择');
      return;
    }

    // 兼容多种字段名
    const uid = card.uid;
    const cid = card.cid || card.id;  // 优先使用 cid，兼容 id

    console.log('准备核销:', { uid, cid, checknum: checkNum, card });

    if (checkNum <= 0 || checkNum > card.leftcount) {
      showToast('核销次数不能大于剩余次数');
      return;
    }

    try {
      const response = await checkUserCard({
        uid: uid,
        cid: cid,
        checknum: checkNum,
      });
      console.log('核销成功，响应:', response);
      showSuccessToast('核销成功');
      setCheckModalOpen(false);
      setSelectedCard(null);
      // 刷新用户数据
      await handleSearchUser();
    } catch (error) {
      console.error('核销失败:', error);
      showToast('核销失败，请重试');
    }
  };

  // 打开全部退款弹窗
  const openFullRefundModal = (order: Order) => {
    setSelectedOrder(order);
    setRefundAmount(order.total);
    // 初始化卡片剩余次数为0（全部清零）
    const initialCounts: { [key: string]: number } = {};
    const cards = order.cards || order.usercards || [];
    cards.forEach((card) => {
      const cardId = card.cid || card.id || card.cardid;
      initialCounts[cardId] = 0;
    });
    setCardLeftCounts(initialCounts);
    setRefundModalOpen(true);
  };

  // 打开部分退款弹窗
  const openPartialRefundModal = (order: Order) => {
    setSelectedOrder(order);
    setRefundAmount('');
    // 初始化卡片剩余次数为当前剩余次数
    const initialCounts: { [key: string]: number } = {};
    const cards = order.cards || order.usercards || [];
    cards.forEach((card) => {
      const cardId = card.cid || card.id || card.cardid;
      initialCounts[cardId] = card.leftcount;
    });
    setCardLeftCounts(initialCounts);
    setRefundModalOpen(true);
  };

  // 修改卡片剩余次数
  const handleCardLeftCountChange = (cid: string, value: number) => {
    setCardLeftCounts((prev) => ({
      ...prev,
      [cid]: value,
    }));
  };

  // 确认退款
  const handleConfirmRefund = async () => {
    if (!selectedOrder) return;

    if (!refundAmount || parseFloat(refundAmount) <= 0) {
      showToast('请输入退款金额');
      return;
    }

    try {
      // 构建usercardleft参数
      const cards = selectedOrder.cards || selectedOrder.usercards || [];
      const usercardleft = cards.map((card) => {
        const cardId = card.cid || card.id || card.cardid;
        return {
          id: card.id,
          leftcount: cardLeftCounts[cardId] || 0,
        };
      });

      console.log('退款参数:', {
        oid: selectedOrder.oid || selectedOrder.orderid,
        money: refundAmount,
        usercardleft
      });

      await userCardOrderRefund({
        oid: selectedOrder.oid || selectedOrder.orderid,
        money: refundAmount,
        usercardleft: JSON.stringify(usercardleft),
      });
      showSuccessToast('退款成功');
      setRefundModalOpen(false);
      // 刷新订单数据
      fetchUserOrders();
    } catch (error) {
      console.error('退款失败:', error);
      showToast('退款失败，请重试');
    }
  };

  // ============ 当日销售记录功能 ============

  // 获取当日销售记录
  const fetchSaleRecords = async () => {
    setIsLoadingSales(true);
    try {
      const res = await getBuySearch();
      if (res && res.buys) {
        setSaleRecords(res.buys);
      }
    } catch (error) {
      console.error('获取销售记录失败:', error);
    } finally {
      setIsLoadingSales(false);
    }
  };

  // 打开备注弹窗
  const openRemarkModal = (sale: SaleRecord) => {
    setSelectedSale(sale);
    setRemarkInput(sale.remark || '');
    setRemarkModalOpen(true);
  };

  // 保存备注
  const handleSaveRemark = async () => {
    if (!selectedSale) return;

    try {
      await setCardRemark({
        cid: selectedSale.cid,
        remark: remarkInput,
      });
      showSuccessToast('备注保存成功');
      setRemarkModalOpen(false);
      // 刷新销售记录
      fetchSaleRecords();
    } catch (error) {
      console.error('保存备注失败:', error);
    }
  };

  // Tab切换
  const handleTabClick = (value: number) => {
    setCurrentTab(value);
    if (value === 1) {
      // 切换到销售记录tab时加载数据
      fetchSaleRecords();
    }
  };

  // 检查是否有管理员权限
  useEffect(() => {
    // ut: 1不可验票，2可验票（管理员权限）
    if (userInfo.ut !== '2') {
      showToast('您没有管理员权限');
      // setTimeout(() => {
      //   Taro.navigateBack();
      // }, 1500);
    }
  }, [userInfo]);

  return (
    <View className='admin-page-wrap'>
      {/* 头部 */}
      <View className='admin-header'>
        <View className='admin-title'>管理员中心</View>
        <View className='admin-subtitle'>用户核销与销售管理</View>
      </View>

      {/* Tabs */}
      <View className='admin-tabs'>
        <AtTabs current={currentTab} tabList={TAB_LIST} onClick={handleTabClick}>
          {/* Tab 1: 用户查询核销 */}
          <AtTabsPane current={currentTab} index={0}>
            <View className='tab-content'>
              {/* 搜索区域 */}
              <View className='search-section'>
                <View className='search-input-wrap'>
                  <AtInput
                    name='phone'
                    type='phone'
                    placeholder='请输入用户手机号'
                    value={searchPhone}
                    onChange={(value) => setSearchPhone(String(value))}
                  />
                  <Button className='search-btn' onClick={handleSearchUser}>
                    搜索
                  </Button>
                </View>
              </View>

              {/* 用户信息 */}
              {userData ? (
                <View className='user-info-card'>
                  <View className='user-header'>
                    <View className='user-meta'>
                      <View className='user-phone'>{userData.phone}</View>
                    </View>
                  </View>
                </View>
              ) : null}

              {/* 卡片列表 */}
              {userCards.length > 0 ? (
                <View className='cards-section'>
                  <View className='section-title'>用户持卡</View>
                  {userCards.map((card) => {
                    const cardKey = card.cid || card.cardid || card.id || 'unknown';
                    const cardName = card.name || card.cardname || '未知卡片';
                    return (
                      <View className='card-item' key={cardKey}>
                        <View className='card-header'>
                          <Text className='card-name'>{cardName}</Text>
                          <Text className={'card-status ' + (card.status === '1' ? 'active' : 'expired')}>
                            {card.status === '1' ? '有效' : '已过期'}
                          </Text>
                        </View>
                        <View className='card-info'>
                          <View className='info-item'>
                            <View className='info-label'>剩余次数</View>
                            <View className='info-value'>{card.leftcount}次</View>
                          </View>
                          <View className='info-item'>
                            <View className='info-label'>总次数</View>
                            <View className='info-value'>{card.totalcount}次</View>
                          </View>
                          <View className='info-item'>
                            <View className='info-label'>有效期至</View>
                            <View className='info-value'>{card.expiredate}</View>
                          </View>
                        </View>
                        <View className='card-actions'>
                          <Button
                            className='action-btn check-btn'
                            onClick={() => openCheckModal(card)}
                            disabled={card.leftcount <= 0}
                          >
                            手动核销
                          </Button>
                        </View>
                      </View>
                    );
                  })}
                </View>
              ) : null}

              {/* 订单列表 */}
              {userOrders.length > 0 ? (
                <View className='orders-section'>
                  <View className='section-title'>今日订单</View>
                  {userOrders.map((order) => {
                    const orderKey = order.oid || order.id || order.orderid || 'unknown';
                    const cards = order.cards || order.usercards || [];
                    return (
                      <View className='order-item' key={orderKey}>
                        <View className='order-header'>
                          <Text className='order-no'>订单号: {order.orderno}</Text>
                          <Text className='order-time'>{order.createtime}</Text>
                        </View>
                        <View className='order-content'>
                          <View className='order-info-row'>
                            <Text className='info-label'>订单金额</Text>
                            <Text className='info-value price'>¥{order.total}</Text>
                          </View>
                          <View className='order-info-row'>
                            <Text className='info-label'>包含卡片</Text>
                            <Text className='info-value'>{cards.length}张</Text>
                          </View>
                        </View>
                        <View className='order-actions'>
                          <Button className='action-btn full-refund-btn' onClick={() => openFullRefundModal(order)}>
                            全部退款
                          </Button>
                          <Button className='action-btn partial-refund-btn' onClick={() => openPartialRefundModal(order)}>
                            部分退款
                          </Button>
                        </View>
                      </View>
                    );
                  })}
                </View>
              ) : null}

              {/* 空状态 */}
              {!isLoading && !userData ? (
                <View className='empty-state'>
                  <Text className='empty-text'>请输入手机号搜索用户</Text>
                </View>
              ) : null}

              {userData && userCards.length === 0 && userOrders.length === 0 ? (
                <View className='empty-state'>
                  <Text className='empty-text'>该用户暂无卡片和订单</Text>
                </View>
              ) : null}
            </View>
          </AtTabsPane>

          {/* Tab 2: 当日销售记录 */}
          <AtTabsPane current={currentTab} index={1}>
            <View className='tab-content'>
              <View className='sales-section'>
                {saleRecords.map((sale) => (
                  <View className='sales-item' key={sale.cid}>
                    <View className='sales-header'>
                      <View className='sales-time-price'>
                        <Text className='sales-time'>{sale.buytime}</Text>
                        <View className='sales-prices'>
                          {sale.totalpay && (
                            <Text className='sales-price main-price'>¥{sale.totalpay}</Text>
                          )}
                          {sale.total && sale.total !== sale.totalpay && (
                            <Text className='sales-price secondary-price'>¥{sale.total}</Text>
                          )}
                        </View>
                      </View>
                    </View>
                    <View className='sales-content'>
                      <View className='card-name'>{sale.cardname}</View>
                      <View className='buyer-info-group'>
                        <View className='buyer-item'>
                          <Text className='buyer-label'>购买人:</Text>
                          <Text className='buyer-value'>{sale.buyername}</Text>
                        </View>
                        <View className='buyer-item'>
                          <Text className='buyer-label'>用户ID:</Text>
                          <Text className='buyer-value'>{sale.uid}</Text>
                        </View>
                        <View className='buyer-item'>
                          <Text className='buyer-label'>手机:</Text>
                          <Text className='buyer-value'>{sale.buyerphone}</Text>
                        </View>
                        <View className='buyer-item'>
                          <Text className='buyer-label'>备注:</Text>
                          <Text className='buyer-value'>{sale.cardremark}</Text>
                        </View>
                      </View>
                    </View>
                    <View className='sales-remark'>
                      {sale.remark ? (
                        <View>
                          <View className='remark-label'>备注:</View>
                          <View className='remark-content'>{sale.remark}</View>
                        </View>
                      ) : null}
                      <Button className='remark-btn' onClick={() => openRemarkModal(sale)}>
                        {sale.remark ? '修改备注' : '添加备注'}
                      </Button>
                    </View>
                  </View>
                ))}

                {saleRecords.length === 0 && !isLoadingSales ? (
                  <View className='empty-state'>
                    <Text className='empty-text'>今日暂无销售记录</Text>
                  </View>
                ) : null}
              </View>
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>

      {/* 核销弹窗 */}
      {
        checkModalOpen && (
               <AtModal isOpened={checkModalOpen} onClose={() => {
        setCheckModalOpen(false);
        setSelectedCard(null);
        setCheckNum(1);
      }}>
        <AtModalHeader>核销确认</AtModalHeader>
        <AtModalContent>
          <View className='check-modal'>
            <View className='modal-content'>
              {/* 核销次数输入区 */}
              <View className='check-num-input'>
                <View className='input-label'>请输入核销次数</View>
                <AtInputNumber
                  min={1}
                  max={selectedCard && selectedCard.leftcount || 1}
                  step={1}
                  value={checkNum}
                  onChange={(value) => setCheckNum(Number(value))}
                />
              </View>

              {/* 卡片信息展示区 */}
              <View className='check-info'>
                <View className='info-row'>
                  <Text className='label'>卡片名称</Text>
                  <Text className='value'>{selectedCard && selectedCard.name}</Text>
                </View>
                <View className='info-row'>
                  <Text className='label'>剩余次数</Text>
                  <Text className='value'>{selectedCard && selectedCard.leftcount}次</Text>
                </View>
                <View className='info-row'>
                  <Text className='label'>本次核销</Text>
                  <Text className='value'>{checkNum}次</Text>
                </View>
                <View className='info-row'>
                  <Text className='label'>核销后剩余</Text>
                  <Text className='value'>{(selectedCard && selectedCard.leftcount || 0) - checkNum}次</Text>
                </View>
              </View>
            </View>
          </View>
        </AtModalContent>
        <AtModalAction>
          <Button className='modal-btn cancel-btn' onClick={() => {
            console.log('取消按钮被点击');
            setCheckModalOpen(false);
          }}>取消</Button>
          <Button className='modal-btn confirm-btn' onClick={() => {
            handleConfirmCheck(selectedCard);
          }}>确认核销</Button>
        </AtModalAction>
      </AtModal>
        )
      }


      {/* 退款弹窗 */}
      {
        refundModalOpen && (
    <AtModal isOpened={refundModalOpen} onClose={() => {
        setRefundModalOpen(false);
        setSelectedOrder(null);
        setCardLeftCounts({});
        setRefundAmount('');
      }}>
        <AtModalHeader>订单退款</AtModalHeader>
        <AtModalContent>
          <View className='refund-modal'>
            <View className='refund-cards'>
              {selectedOrder && selectedOrder.usercards.map((card) => (
                <View className='refund-card-item' key={card.cardid}>
                  <View className='card-name'>{card.name}</View>
                  <AtInputNumber
                    className='left-count-input'
                    min={0}
                    max={card.totalcount}
                    step={1}
                    value={cardLeftCounts[card.cardid] || 0}
                    onChange={(value) => handleCardLeftCountChange(card.cardid, Number(value))}
                  />
                </View>
              ))}
            </View>
            <View className='refund-amount'>
              <AtInput
                name='refundAmount'
                title='退款金额'
                type='digit'
                placeholder='请输入退款金额'
                value={refundAmount}
                onChange={(value) => setRefundAmount(String(value))}
              />
            </View>
          </View>
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => setRefundModalOpen(false)}>取消</Button>
          <Button onClick={handleConfirmRefund}>确认退款</Button>
        </AtModalAction>
      </AtModal>
        )
      }


      {/* 备注弹窗 */}
      {
        remarkModalOpen && (
               <AtModal isOpened={remarkModalOpen} onClose={() => {
        setRemarkModalOpen(false);
        setSelectedSale(null);
        setRemarkInput('');
      }}>
        <AtModalHeader>编辑备注</AtModalHeader>
        <AtModalContent>
          <View className='remark-modal'>
            <AtInput
              className='remark-input'
              name='remark'
              type='text'
              placeholder='请输入备注信息'
              value={remarkInput}
              onChange={(value) => setRemarkInput(String(value))}
            />
          </View>
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => setRemarkModalOpen(false)}>取消</Button>
          <Button onClick={handleSaveRemark}>保存</Button>
        </AtModalAction>
      </AtModal>
        )
      }

    </View>
  );
};

export default AdminPage;
