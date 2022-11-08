import { useEffect } from "react";
import { Layout } from "antd";
import { getAllDictionariesThunk, getAuthMenuListThunk, getUserInfo, globalActions } from "@/store/global";
import Header from "./Header";
import Sider from "./Sider";
import Content from "./Content";
import { useAppDispatch } from '@/hooks/store';
import { useNavigate } from 'react-router-dom';
import store from '@/store';

const BasicLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserInfo()).unwrap().catch(() => {
      store.dispatch(globalActions.resetState());
      navigate('/login');
    });
    dispatch(getAllDictionariesThunk());
    dispatch(getAuthMenuListThunk());
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
