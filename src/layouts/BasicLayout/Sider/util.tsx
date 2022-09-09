import { createElement } from "react";
import type { MenuProps } from "antd";
import { pathToRegexp } from "path-to-regexp";
import { toHump } from "@/utils/common";
import { allIcons } from "@/utils/icons";

type MenuItem = Required<MenuProps>["items"][number];
interface IMenuProps {
  parentkeys?: string[];
  children?: ICustomMenuItem[];
  icon?: React.ReactNode;
}
type ICustomMenuItem = MenuItem & IMenuProps;
const baseIcon = "smile";

const getMenuMatches = (
  flatMenus: ICustomMenuItem[],
  path: string
): ICustomMenuItem[] => {
  const matches: ICustomMenuItem[] = [];
  for (let menu of flatMenus) {
    if (menu.key) {
      try {
        if (pathToRegexp(menu.key as string).test(path)) {
          matches.push(menu);
          continue;
        }

        if (path.lastIndexOf("/") === path.length - 1) {
          path = path.slice(0, -1);
        }
        if (pathToRegexp(`${menu.key}/(.*)`).test(path)) {
          matches.push(menu);
          continue;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  matches.sort((a, b) => {
    if (a.key === path) {
      return 1;
    }
    if (b.key === path) {
      return -1;
    }
    return (
      (a.key as string)!.substr(1).split("/").length -
      (b.key as string)!.substr(1).split("/").length
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

const modifyMenuData = (
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

export const menuData: ICustomMenuItem[] = [
  {
    label: "首页",
    key: "/overview",
  },
  {
    label: "权限管理",
    key: "/authorityManage",
    children: [
      {
        label: "用户列表",
        key: "/authManage/user",
      },
      {
        label: "角色列表",
        key: "/authManage/role",
      },
      {
        label: "菜单列表",
        key: "/authManage/menu",
      },
    ],
  },
];

modifyMenuData(menuData);
