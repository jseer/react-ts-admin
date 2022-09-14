import { useEffect } from "react";
import { Layout } from "antd";
import { getUserInfo } from "@/store/global";
import Header from "./Header";
import Sider from "./Sider";
import Content from "./Content";
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { useNavigate } from 'react-router-dom';

const BasicLayout: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
  return (
    <Layout className="admin-layout">
      <Sider />
      <Layout className="site-layout">
        <Header />
        <Content/>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
