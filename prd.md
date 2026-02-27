# 需求#
在个人中心新增“管理员页面”入口，包含以下两个核心模块：

A. 用户查询与核销 (User Query)
查询功能： 支持输入“用户手机号”检索用户信息。

卡片记录展示： 检索成功后，展示该用户持有的所有卡片记录。

手动核销： 找到对应卡片，提供“手动核销”按钮。

订单记录与退款（重点）：

展示交易列表。

全部退款： 触发后，该订单内所有卡片点数/次数清零，退回全款。

部分退款： * 点击后弹出列表展示订单内所有卡片。

支持手动修改剩余次数。

支持手动输入退款金额。

B. 当日充卡/销售记录
搜索功能： 检索当天的所有卡片销售记录。

列表展示： 需展示销售时间、卡片名称、成交价格。

备注功能： 管理员可以点击某条记录，为该卡片添加或修改备注信息。



# 接口
用户卡查询接口：/MiniApi/User/usercards:参数phone(手机号)
用户卡核销接口：/MiniApi/User/check：参数uid（用户id），cid（卡id），checknum（核销次数，可不填默认1）
当日充卡记录接口/MiniApi/User/buysearch
充卡备注接口/MiniApi/User/setcardremark：参数cid（卡id），remark（备注信息）
用户购卡订单接口：/MiniApi/Card/usercardorders:参数odate（日期，yyyy-mm-dd格式）
用户卡订单退款：/MiniApi/Card/usercardorderrefund：参数oid(订单id)，money(退款金额，单位元)，usercardleft（设置的次数json数据，非必需）
设置的次数json数据格式如下：
[{
  "id": 123,
  "leftcount": 1
}]

卡购买接口：/MiniApi/User/buycard：增加参数relvids（销售卡id，多个以英文逗号”,”隔开）
