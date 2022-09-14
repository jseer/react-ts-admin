import { createElement } from 'react';
import { Dropdown, Layout, Menu, MenuProps } from 'antd';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import styles from './index.module.less';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { globalActions, logout } from '@/store/global';
import { useNavigate } from 'react-router-dom';

const { Header: AHeader } = Layout;
const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { collapsed, userInfo } = useAppSelector((state) => ({
    collapsed: state.global.collapsed,
    userInfo: state.global.userInfo,
  }));

  const onMenuClick: MenuProps["onClick"] = async (info) => {
    if(info.key === 'logout') {
      await dispatch(logout()).unwrap();
      navigate('/login');
    }
  };
  const menu = (
    <Menu
      onClick={onMenuClick}
      items={[
        {
          key: 'logout',
          label: '退出登录',
        },
      ]}
    />
  );
  return (
    <AHeader className={styles.header} style={{ padding: 0 }}>
      {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: styles.trigger,
        onClick: () => {
          dispatch(globalActions.setCollapsed(!collapsed));
        },
      })}
      <Dropdown overlay={menu}>
        <span className={styles.avator}>Hi {userInfo?.name}</span>
      </Dropdown>
    </AHeader>
  );
};

export default Header;
