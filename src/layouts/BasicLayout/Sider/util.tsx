import { createElement } from "react";
import type { MenuProps } from "antd";
import { pathToRegexp } from "path-to-regexp";
import { toHump } from "@/utils/common";
import { allIcons } from "@/utils/icons";
import { IMenuInfo } from '@/api/menu';

type MenuItem = Required<MenuProps>["items"][number];
interface IMenuProps {
  parentkeys?: string[];
  children?: ICustomMenuItem[];
  icon?: React.ReactNode;
  path?: string;
}
export type ICustomMenuItem = MenuItem & IMenuProps;
const baseIcon = "smile";

const getMenuMatches = (
  flatMenus: ICustomMenuItem[],
  path: string
): ICustomMenuItem[] => {
  const matches: ICustomMenuItem[] = [];
  for (let menu of flatMenus) {
    if (menu.path) {
      try {
        if (pathToRegexp(menu.path as string).test(path)) {
          matches.push(menu);
          continue;
        }

        if (path.lastIndexOf("/") === path.length - 1) {
          path = path.slice(0, -1);
        }
        if (pathToRegexp(`${menu.path}/(.*)`).test(path)) {
          matches.push(menu);
          continue;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  matches.sort((a, b) => {
    if (a.path === path) {
      return 1;
    }
    if (b.path === path) {
      return -1;
    }
    return (
      (a.path as string)!.substr(1).split("/").length -
      (b.path as string)!.substr(1).split("/").length
    );
  });

  return matches;
};

const getFlatMenus = (
  menuData: ICustomMenuItem[] = [],
  flatMenus: ICustomMenuItem[] = []
): void => {
  menuData.forEach((item) => {
    flatMenus.push(item);
    if (item.children) {
      getFlatMenus(item.children, flatMenus);
    }
  });
};
export const getMatchKeys = (menuData: ICustomMenuItem[], path: string) => {
  let selectedKeys: string[] = [];
  let openKeys: string[] = [];
  let selectedMenu: ICustomMenuItem | undefined;
  const flatMenus: ICustomMenuItem[] = [];
  getFlatMenus(menuData, flatMenus);
  const matches = getMenuMatches(flatMenus, path);
  const lastMatch = matches[matches.length - 1];
  if (lastMatch) {
    selectedMenu = lastMatch;
    if (lastMatch.parentkeys) {
      openKeys.push(...lastMatch.parentkeys);
    }
    selectedKeys.push(selectedMenu.key as string);
  }
  return { selectedKeys, openKeys, selectedMenu };
};

const formatter = (menu: ICustomMenuItem, icon: string) => {
  const v4IconName = toHump(icon[0].toUpperCase() + icon.slice(1));
  const NewIcon = allIcons[icon] || allIcons[`${v4IconName}Outlined`];
  if (NewIcon) {
    try {
      menu.icon = createElement(NewIcon);
    } catch (error) {
      console.log(error);
      menu.icon = undefined;
    }
  } else {
    menu.icon = undefined;
  }
};

export const modifyMenuData = (
  menuData: ICustomMenuItem[],
  parent?: ICustomMenuItem
) => {
  menuData.forEach((menu, index) => {
    menu.parentkeys = [];
    if (parent) {
      menu.parentkeys.push(...parent.parentkeys!, parent.key as string);
    }
    const icon = menu.icon;
    if (icon && typeof icon === "string") {
      formatter(menu, icon);
    } else if (!menu.parentkeys.length) {
      formatter(menu, baseIcon);
    }
    if (menu.children?.length) {
      modifyMenuData(menu.children, menu);
    }
  });
};

export const transformMenuList = (menuList: IMenuInfo[], menuData: ICustomMenuItem[]) => {
  menuList.forEach((menu) => {
    const item: ICustomMenuItem= {
      label: menu.name,
      key: menu.code,
      path: menu.path,
    }
    if (menu.children?.length) {
      const arr: ICustomMenuItem[] = [];
      item.children = transformMenuList(menu.children, arr);
    }
    menuData.push(item);
  })
  return menuData;
}
// export const menuData: ICustomMenuItem[] = [
//   {
//     label: "首页",
//     key: "/overview",
//   },
//   {
//     label: "权限管理",
//     key: "/authorityManage",
//     children: [
//       {
//         label: "用户列表",
//         key: "/authManage/user",
//       },
//       {
//         label: "角色列表",
//         key: "/authManage/role",
//       },
//       {
//         label: "菜单列表",
//         key: "/authManage/menu",
//       },
//     ],
//   },
//   {
//     label: "基础数据",
//     key: "/baseData",
//     children: [
//       {
//         label: "字典",
//         key: "/baseData/dictionaries",
//       },
//     ],
//   },
// ];

// modifyMenuData(menuData);
