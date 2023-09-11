// export const ROUTER_MAP = new Map([
//     ['Main','/pages/Main/index'],
//     ['GoodGoods','/pages/GoodGoods/index'],
//     ['Me','/pages/Me/index'],
// ])


export const ROUTER_NAME_MAP = {
    main:'Main',
    goodGoods:'GoodGoods',
    photowall:'PhotoWall',
    me:'Me',
    community:'Community',
    reserve:'Reserve',
    index:'Index',
};

export const ORDER_OTYPE_MAP = new Map([
    ['全部订单',-99],
    ['待付款',1],
    ['待发货',2],
    ['待收货',3],
    ['交易完成',4],
])

export const ORDER_STATUS_MAP = new Map([
    ['待付款',0],
    ['待发货',1],
    ['待收货',2],
    ['交易完成',3],
])
// 0待审核，1审核成功，2审核不通过,退款中，3审核不通过,退款成功，4审核不通过,退款失败，5已售出下线，6用户下线
export const G_STATUS_MAP = new Map([
    ['待审核', '0'],
    ['审核成功', '1'],
    ['审核不通过', '2'],
    ['退款中', '2'],
    ['审核不通过', '3'],
    ['退款失败', '3'],
    ['已售出下线', '4'],
    ['待审用户下线核', '5'],
])
