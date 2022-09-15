import { Layout, Menu, MenuProps } from "antd";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import styles from "./index.module.less";
import {getMatchKeys, transformMenuList, ICustomMenuItem, modifyMenuData} from "./util";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { globalActions, } from "@/store/global";

const { Sider: ASider } = Layout;

const Sider: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { collapsed, openKeys, selectedKeys, menuList } = useAppSelector((state) => {
    const { collapsed, openKeys, selectedKeys, menuList } = state.global;
    return {
      collapsed,
      openKeys,
      selectedKeys,
      menuList,
    };
  });
  const onMenuItemSelect: MenuProps["onSelect"] = (info: any) => {
    const path = info.item.props.path;
    console.log(info, 'onMenuItemSelect');
    if(path) {
      navigate(path);
    }
  };

  const onOpenChange = (openKeys: string[]) => {
    dispatch(globalActions.setOpenKeys(openKeys));
  };

  const menuData = useMemo(() => {
    const menuData: ICustomMenuItem[] = [];
    transformMenuList(menuList, menuData);
    modifyMenuData(menuData);
    return menuData;
  }, [menuList])

  useEffect(() => {
    const { selectedKeys, openKeys } = getMatchKeys(
      menuData,
      location.pathname,
    );
    dispatch(globalActions.setSelectedKeys(selectedKeys));
    dispatch(globalActions.setOpenKeys(openKeys));
  }, [location.pathname, menuData]);

  return (
    <ASider
      className={styles.sider}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className={styles.logo}></div>
      <Menu
        theme="dark"
        mode="inline"
        items={menuData}
        onSelect={onMenuItemSelect}
        onOpenChange={onOpenChange}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
      />
    </ASider>
  );
};

export default Sider;
