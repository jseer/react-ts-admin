import { Layout, Menu, MenuProps } from "antd";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import styles from "./index.module.less";
import {getMatchKeys, menuData} from "./util";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { globalActions, } from "@/store/global";

const { Sider: ASider } = Layout;

const Sider: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { collapsed, openKeys, selectedKeys } = useAppSelector((state) => {
    const { collapsed, openKeys, selectedKeys } = state.global;
    return {
      collapsed,
      openKeys,
      selectedKeys,
    };
  });
  const onMenuItemSelect: MenuProps["onSelect"] = (info: any) => {
    navigate(info.key);
  };

  const onOpenChange = (openKeys: string[]) => {
    dispatch(globalActions.setOpenKeys(openKeys));
  };
  useEffect(() => {
    const { selectedKeys, openKeys } = getMatchKeys(
      menuData,
      location.pathname,
    );
    dispatch(globalActions.setSelectedKeys(selectedKeys));
    dispatch(globalActions.setOpenKeys(openKeys));
  }, [location.pathname]);
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
