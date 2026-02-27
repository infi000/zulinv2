# GoupiaoDetail 关联卡功能实现总结

## 功能需求
在 `pages/GoupiaoDetail/index` 路由下，实现对新增字段 `relesalecards` 的展示和购买流程集成。

## 实现内容

### 1. 前端展示功能 (index.tsx)

#### 新增状态管理
- `releasalecards`: 存储从API返回的关联卡列表
- `selectedRelIds`: 存储用户选中的关联卡ID（字符串数组）

#### 数据获取
- 在 `useDidShow` 中调用 `getCardDetail` 接口时，提取返回数据中的 `relesalecards` 字段
- **默认行为**：页面加载时自动选中所有关联卡

#### UI交互
- 新增 `handleRelCardSelect` 函数处理用户对关联卡的选择/取消选择
- 用户可以通过点击关联卡旁的复选框来选择或取消选择

#### API参数更新
- 在 `handleSubmit` 函数中，当用户点击"立即购买快乐"时：
  - 如果有选中的关联卡，自动在请求参数中添加 `relvids` 字段
  - `relvids` 格式：多个ID用英文逗号","隔开（如："43,44"）
  - 调用 `User/buycard` 接口时携带此参数

### 2. UI样式设计 (index.scss)

#### 关联卡展示区域
- 新增 `.related-cards-section` 类，包含：
  - **标题区域**：显示"关联卡列表"标题
  - **列表容器**：竖直布局，卡片间距12px

#### 单张关联卡样式
- **布局**：水平flexbox，包含三部分
  - **左侧缩略图**：80×80px，圆角6px
  - **中间信息区**：
    - 卡名称（14px加粗）
    - 详细信息（12px灰色）：期限、次数、价格
    - 备注说明（11px浅灰）
  - **右侧复选框**：24×24px圆形复选框

#### 复选框交互
- **未选中状态**：灰色边框
- **选中状态**：绿色背景 (#4CAF50)，显示白色对勾
- **点击效果**：按下时缩放至95%

## API集成说明

### 请求参数示例
```
GET /User/buycard?cardid=xxx&relvids=43,44
```

### 关联卡数据结构
```json
{
    "id": "43",
    "cardname": "测试总",
    "cardtype": "1",
    "cardduration": "1",
    "carddurationtype": "year",
    "cardcount": "1",
    "thumbinal": "https://...",
    "cardpic": "https://...",
    "price": "0.01",
    "usedaytype": "1",
    "remark": "测试用 无效",
    "ctime": "1970-01-01 08:00:00"
}
```

## 文件改动清单

| 文件 | 改动说明 |
|------|---------|
| `src/pages/GoupiaoDetail/index.tsx` | 新增关联卡显示逻辑、选择交互、API参数传递 |
| `src/pages/GoupiaoDetail/index.scss` | 新增关联卡展示区域的样式定义 |

## 使用体验流程

1. 用户进入GoupiaoDetail页面
2. 页面加载时自动获取并显示主卡和关联卡列表
3. 默认所有关联卡都被选中（用户可以取消选择）
4. 用户点击"立即购买快乐"时，系统会将选中的关联卡ID组合成 `relvids` 参数发送到后端
5. 后端根据 `relvids` 参数处理关联卡的购买逻辑

## 技术细节

### 复选框实现
- 使用React状态管理选中ID列表
- 通过 `selectedRelIds.includes(card.id)` 判断是否被选中
- 样式动态绑定：`className={`checkbox ${selectedRelIds.includes(card.id) ? 'checked' : ''}`}`

### 参数构建
```typescript
const params: any = { cardid: cid };
if (selectedRelIds.length > 0) {
    params.relvids = selectedRelIds.join(',');  // ["43", "44"] → "43,44"
}
```

## 后续建议
1. 可考虑添加"全选/全不选"快捷按钮
2. 可添加关联卡的详细信息弹窗
3. 建议在购买前显示选中卡的总价计算
