/**
 * 管理员页面接口 Mock 数据
 * 用于开发测试
 */

import { currentDate } from '@/utils/util';

// 用户信息类型
interface UserInfo {
  uid: string;
  nickname: string;
  phone: string;
  avatar: string;
}

// 用户卡数据类型
interface UserCard {
  id: string;
  cid: string;
  name: string;
  leftcount: number;
  totalcount: number;
  expiredate: string;
  status: string;
}

// 订单类型
interface Order {
  oid: string;
  orderno: string;
  createtime: string;
  total: string;
  cards: UserCard[];
}

// 销售记录类型
interface SaleRecord {
  cid: string;
  cardname: string;
  price: string;
  buytime: string;
  buyername: string;
  buyerphone: string;
  remark: string;
}

// ==================== Mock 数据 ====================

// Mock 用户信息
const mockUserInfo: UserInfo = {
  uid: 'user_001',
  nickname: '张三',
  phone: '13800138000',
  avatar: 'https://i.pravatar.cc/150?img=1',
};

// Mock 用户卡片列表
const mockUserCards: UserCard[] = [
  {
    id: 'card_001',
    cid: 'c_001',
    name: '游泳次卡（10次）',
    leftcount: 5,
    totalcount: 10,
    expiredate: '2025-12-31',
    status: '1', // 1=有效, 0=已过期
  },
  {
    id: 'card_002',
    cid: 'c_002',
    name: '健身月卡',
    leftcount: 15,
    totalcount: 30,
    expiredate: '2025-06-30',
    status: '1',
  },
  {
    id: 'card_003',
    cid: 'c_003',
    name: '瑜伽体验卡（已过期）',
    leftcount: 0,
    totalcount: 3,
    expiredate: '2024-01-01',
    status: '0',
  },
];

// Mock 今日订单列表
const mockUserOrders: Order[] = [
  {
    oid: 'order_001',
    orderno: 'ORD20250211001',
    createtime: '2025-02-11 10:30:00',
    total: '299.00',
    cards: [
      {
        id: 'card_001',
        cid: 'c_001',
        name: '游泳次卡（10次）',
        leftcount: 10,
        totalcount: 10,
        expiredate: '2025-12-31',
        status: '1',
      },
    ],
  },
  {
    oid: 'order_002',
    orderno: 'ORD20250211002',
    createtime: '2025-02-11 14:20:00',
    total: '599.00',
    cards: [
      {
        id: 'card_002',
        cid: 'c_002',
        name: '健身月卡',
        leftcount: 30,
        totalcount: 30,
        expiredate: '2025-06-30',
        status: '1',
      },
    ],
  },
];

// Mock 当日销售记录
const mockSaleRecords: SaleRecord[] = [
  {
    cid: 'c_001',
    cardname: '游泳次卡（10次）',
    price: '299.00',
    buytime: '2025-02-11 09:15:00',
    buyername: '李四',
    buyerphone: '13900139000',
    remark: '新客户首次购买',
  },
  {
    cid: 'c_002',
    cardname: '健身月卡',
    price: '599.00',
    buytime: '2025-02-11 10:30:00',
    buyername: '王五',
    buyerphone: '13700137000',
    remark: '',
  },
  {
    cid: 'c_003',
    cardname: '瑜伽体验卡（3次）',
    price: '199.00',
    buytime: '2025-02-11 11:45:00',
    buyername: '赵六',
    buyerphone: '13600136000',
    remark: '团购活动',
  },
  {
    cid: 'c_004',
    cardname: '私教课包（10节）',
    price: '2999.00',
    buytime: '2025-02-11 14:20:00',
    buyername: '张三',
    buyerphone: '13800138000',
    remark: 'VIP客户',
  },
  {
    cid: 'c_005',
    cardname: '网球场地卡（20小时）',
    price: '1599.00',
    buytime: '2025-02-11 16:00:00',
    buyername: '孙七',
    buyerphone: '13500135000',
    remark: '',
  },
];

// ==================== Mock 接口函数 ====================

/**
 * 模拟延迟
 */
const delay = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 1. 用户卡查询接口
 * GET /MiniApi/User/usercards
 * @param phone 手机号
 */
export const mockGetUserCards = async (params: { phone: string }) => {
  await delay();

  // 模拟根据手机号查询不同用户
  if (params.phone === '13800138000') {
    return {
      user: mockUserInfo,
      cards: mockUserCards,
    };
  }

  // 模拟用户不存在
  if (params.phone === '11111111111') {
    return {
      user: null,
      cards: [],
    };
  }

  // 默认返回测试数据
  return {
    user: mockUserInfo,
    cards: mockUserCards,
  };
};

/**
 * 2. 用户卡核销接口
 * POST /MiniApi/User/check
 * @param uid 用户id
 * @param cid 卡id
 * @param checknum 核销次数，默认1
 */
export const mockCheckUserCard = async (params: {
  uid: string;
  cid: string;
  checknum?: number;
}) => {
  await delay(300);

  console.log('[Mock] 核销卡:', params);

  // 模拟核销失败（次数不足）
  if (params.cid === 'c_003') {
    throw new Error('卡片次数不足');
  }

  return {
    success: true,
    message: '核销成功',
    leftcount: 5 - (params.checknum || 1),
  };
};

/**
 * 3. 当日充卡记录查询接口
 * GET /MiniApi/User/buysearch
 */
export const mockGetBuySearch = async () => {
  await delay();

  return {
    list: mockSaleRecords,
    total: mockSaleRecords.length,
  };
};

/**
 * 4. 设置充卡备注接口
 * POST /MiniApi/User/setcardremark
 * @param cid 卡id
 * @param remark 备注信息
 */
export const mockSetCardRemark = async (params: { cid: string; remark: string }) => {
  await delay(300);

  console.log('[Mock] 设置备注:', params);

  return {
    success: true,
    message: '备注设置成功',
  };
};

/**
 * 5. 用户购卡订单查询接口
 * GET /MiniApi/Card/usercardorders
 * @param odate 日期，yyyy-mm-dd格式
 */
export const mockGetUserCardOrders = async (params: { odate: string }) => {
  await delay();

  console.log('[Mock] 查询订单:', params);

  return {
    orders: mockUserOrders,
    total: mockUserOrders.length,
  };
};

/**
 * 6. 用户卡订单退款接口
 * POST /MiniApi/Card/usercardorderrefund
 * @param oid 订单id
 * @param money 退款金额，单位元
 * @param usercardleft 设置的次数json数据，非必需
 */
export const mockUserCardOrderRefund = async (params: {
  oid: string;
  money: string;
  usercardleft?: string;
}) => {
  await delay(500);

  console.log('[Mock] 订单退款:', params);

  // 模拟退款失败
  if (params.oid === 'order_failed') {
    throw new Error('退款失败，订单状态异常');
  }

  return {
    success: true,
    message: '退款成功',
    refundAmount: params.money,
  };
};

// ==================== Mock 开关 ====================

/**
 * 是否启用 Mock 数据
 * 在开发环境下可以设置为 true 进行测试
 */
export const MOCK_ENABLED = false;

/**
 * 获取 Mock 数据或真实数据
 * @param mockFn Mock 函数
 * @param realFn 真实 API 函数
 */
export const withMock = async <T extends any[], R>(
  mockFn: (...args: T) => Promise<R>,
  realFn: (...args: T) => Promise<R>,
  ...args: T
): Promise<R> => {
  if (MOCK_ENABLED) {
    console.log('[Mock] 使用 Mock 数据');
    return mockFn(...args);
  }
  return realFn(...args);
};

export default {
  mockGetUserCards,
  mockCheckUserCard,
  mockGetBuySearch,
  mockSetCardRemark,
  mockGetUserCardOrders,
  mockUserCardOrderRefund,
  MOCK_ENABLED,
  withMock,
};
