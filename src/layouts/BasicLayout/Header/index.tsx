import { createElement } from "react";
import { Layout } from "antd";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import styles from "./index.module.less";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { globalActions } from "@/store/global";

const { Header: AHeader } = Layout;
const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { collapsed } = useAppSelector((state) => ({
    collapsed: state.global.collapsed,
  }));
  return (
    <AHeader className={styles.header} style={{ padding: 0 }}>
      {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: styles.trigger,
        onClick: () => {
          dispatch(globalActions.setCollapsed(!collapsed));
        },
      })}
    </AHeader>
  );
};

export default Header;
