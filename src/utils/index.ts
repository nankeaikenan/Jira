import { useState, useEffect } from 'react';

/** 自定义hooks */
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
     // TODO 依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
  }, []);
};
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完后再运行
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
};

/** 常用 bom 操作 */
export const getParams = (url: any) => {
  let params: any = {};
  let _url = url || window.location.href;
  if (window.URLSearchParams) {
    new URL(_url).searchParams.forEach(
      (value: string, key: string) => (params[key] = decodeURIComponent(value))
    );
  } else {
    _url.replace(/[#|?&]+([^=#|&]+)=([^#|&]*)/gi, function (m: any, key: string, value: string) {
      params[key] = decodeURIComponent(value);
    });
  }
  return params;
};

/* 常用数据操作 */
/**
 * 判断是否是假值
 * @param val
 * @returns
 */
export const isFalsy = (val: unknown) => (val === 0 ? false : !val);
/**
 * 清楚掉对象中值为空的项
 * @param obj
 * @returns
 */
 export const isVoid = ( value: unknown ) =>
 value === undefined || value === null || value === ''

// 在一个函数里，改变传入的对象本身是不好的
// object就要这种键值对的形式{ [key: string]: unknown }
export const cleanObject = ( object?: { [key: string]: unknown } ) => {
 // 不操作原来的对象，自己的生成一个对象
 // Object.assign({}, object)
 if ( !object ) {
   return {}
 }
 const result = { ...object }
 Object.keys( result ).forEach( key => {
   const value = result[key]
   if ( isVoid( value ) ) {
     delete result[key]
   }
 } )
 return result
}
