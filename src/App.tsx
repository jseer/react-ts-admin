import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "@/store";
import Router from "./router";
import './App.less';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider prefixCls="admin" iconPrefixCls="admin">
        <Router />
      </ConfigProvider>
    </Provider>
  );
}

export default App;
