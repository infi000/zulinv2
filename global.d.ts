declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq'
    [key: string]: any
  }
};

declare type TObj<T> = {[key: string]: T};
declare type StringNumber = string | number;
declare  type TModalType = 'edit' | 'create' | 'view';

declare interface IModal {
  type: TModalType
  data: TObj<any>
  show: boolean
}

declare interface IGoods{
  id: string
  title: string
  sale: string
  fpath: string
  price: string
  issale: '-1' | '1'
}

declare interface IPageParams {
  offset?: number | string
  count?: number | string
}
declare interface ISearchGoodsParams extends IPageParams{
  key?: string
  stype?: string
  ctype?: string
  cid?: string
}
// ut: 1不可验票，2可验票
