# 西塔科学探索俱乐部

# 安装依赖
npm i 

# 开发模式

npm run dev:weapp2

# 编译发布

npm run build:weapp

# 加入新页面

以新页面ZcyTest为例

## 第一步创建文件

src/pages/ZcyTest/index.tsx

## 第二步引入文件
src/app.jsx中，在config.pages数组中引入‘pages/ZcyTest/index.tsx’路径

## 注意

config.pages数组的第0位的路径是什么，小程序的首页就是什么。

# api接口维护

`src/config/api.js`