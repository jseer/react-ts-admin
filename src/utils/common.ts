import { IMenuInfo } from '@/api/menu';
import { IDictionariesItem } from '@/api/dictionaries';
export function getItem<T>(key: string, defaultValue: T): T;
export function getItem<T>(key: string): T | undefined;
export function getItem<T>(key: string, defaultValue?: T): T | undefined {
  try {
    return JSON.parse(localStorage.getItem(key)!) || defaultValue;
  } catch (e) {
    console.log(e);
    return defaultValue;
  }
}

export const setItem = (key: string, value: any): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

export function toHump(name: string) {
  return name.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export const initPageInfo = {
  current: 1,
  pageSize: 10,
}

export const getDicItemLabel = (
  dicItem: IDictionariesItem[],
  value: string | number,
) => {
  if (dicItem) {
    const item = dicItem.find((dic) => dic.value == value);
    return item?.label;
  }
};

export const getListItem = (
  list: any[] = [],
  value: string | number,
) => {
  const item = list.find((dic) => dic.value == value);
  return item;
};

export const loopMenuList2PageList = (menuList: IMenuInfo[], pageList: IMenuInfo[]) => {
  menuList.forEach((menu) => {
    // 页面
    if(menu.type === '1' && menu.children) {
      loopMenuList2PageList(menu.children, pageList);
    } else if(menu.type === '2') {
      pageList.push(menu);
    }
  })
}