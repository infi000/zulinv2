# /Card/usercardorders 接口参数修复报告

## 问题描述
`/Card/usercardorders` 接口调用时没有正确传递 `odate` 参数（日期，格式：yyyy-mm-dd）。

## 根本原因分析

### 原始代码的问题
```typescript
// ❌ 之前的代码
const fetchUserOrders = async () => {
  try {
    // const today = currentDate();  // ← 被注释掉了！
    const today = '2026-02-25';      // ← 硬编码的日期
    const res = await getUserCardOrders({ odate: today });
    if (res && res.usercardorders) { // ← 响应字段名错误
      setUserOrders(res.usercardorders);
    }
  } catch (error) {
    console.error('获取订单失败:', error);
  }
};
```

### 存在的三个问题

1. ❌ **`currentDate()` 被注释掉了** - 应该使用函数动态获取当前日期，而不是硬编码
2. ❌ **硬编码日期** - `'2026-02-25'` 是写死的，每次执行都查询同一天的数据
3. ❌ **响应字段错误** - 代码期望 `res.usercardorders`，但实际返回的是 `res.orders`
4. ❌ **缺少日志** - 没有日志记录，无法调试

## 实施的修复方案

### 修复后的代码
```typescript
// ✅ 修复后的代码
const fetchUserOrders = async () => {
  try {
    const today = currentDate();  // ✅ 使用函数动态获取日期
    console.log('正在查询订单，参数：', { odate: today });
    const res = await getUserCardOrders({ odate: today });
    console.log('订单查询响应：', res);
    if (res && res.orders) {  // ✅ 使用正确的响应字段名
      setUserOrders(res.orders);
    }
  } catch (error) {
    console.error('获取订单失败:', error);
    showToast('获取订单失败');  // ✅ 向用户显示错误提示
  }
};
```

## 改动清单

### 文件: `src/pages/AdminPage/index.tsx`

**改动1：启用 currentDate() 函数**
```diff
- // const today = currentDate();
+ const today = currentDate();
```

**改动2：删除硬编码日期**
```diff
- const today = '2026-02-25';
```

**改动3：修正响应字段名**
```diff
- if (res && res.usercardorders) {
-   setUserOrders(res.usercardorders);
+ if (res && res.orders) {
+   setUserOrders(res.orders);
```

**改动4：添加日志记录**
```diff
+ console.log('正在查询订单，参数：', { odate: today });
  const res = await getUserCardOrders({ odate: today });
+ console.log('订单查询响应：', res);
```

**改动5：改进错误处理**
```diff
  } catch (error) {
    console.error('获取订单失败:', error);
+   showToast('获取订单失败');
```

## currentDate() 函数验证

`currentDate()` 函数实现位置：`src/utils/util.js` 第 68-75 行

```javascript
export function currentDate() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
    var day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    return year+"-"+month+"-"+day;  // ✅ 返回 yyyy-mm-dd 格式
}
```

### 返回格式示例
- 当前日期：2026年2月25日 → `2026-02-25`
- 当前日期：2026年1月5日 → `2026-01-05`（自动补零）

## API 接口规范

### /Card/usercardorders
- **方法**: GET
- **参数**: `odate` (必需，格式：yyyy-mm-dd)
- **响应**:
  ```json
  {
    "orders": [
      {
        "oid": "order_001",
        "orderno": "ORD20250211001",
        "createtime": "2025-02-11 10:30:00",
        "total": "299.00",
        "cards": [...]
      }
    ]
  }
  ```

## 测试步骤

1. ✅ 打开管理员中心
2. ✅ 输入手机号搜索用户
3. ✅ 观察控制台日志输出
4. ✅ 确认参数显示 `odate: yyyy-mm-dd` 格式（当前日期）
5. ✅ 确认订单列表加载成功
6. ✅ 检查日期不再是硬编码的 `2026-02-25`

## 浏览器控制台预期输出

```javascript
// 当搜索用户时
正在查询订单，参数： {odate: "2026-02-25"}
订单查询响应： {orders: Array(2), ...}
```

## 总结

这次修复解决了以下问题：
- ✅ 启用了动态日期获取函数
- ✅ 删除了硬编码的日期常量
- ✅ 修正了 API 响应字段名
- ✅ 添加了调试日志
- ✅ 改进了错误提示

现在接口调用会正确传递当前日期的 `odate` 参数，每次执行都会查询最新的订单数据。
