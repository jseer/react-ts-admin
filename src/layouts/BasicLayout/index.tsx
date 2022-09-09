import { createElement } from "react";
import { Layout } from "antd";
import { globalActions } from "@/store/global";
import Header from "./Header";
import Sider from "./Sider";
import Content from "./Content";

const BasicLayout: React.FC<{}> = () => {
  return (
    <Layout className="ad-layout">
      <Sider />
      <Layout className="site-layout">
        <Header />
        <Content/>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
