import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import store from '@/store';
import Router from './router';
import './App.less';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import GlobalInfoTip from './components/GlobalInfoTip';

moment.locale('zh-cn');

function App() {
  return (
    <Provider store={store}>
       <ConfigProvider prefixCls='admin' iconPrefixCls='admin' locale={zhCN}>
          <GlobalInfoTip/>
          <Router />
       </ConfigProvider>
    </Provider>
  );
}

export default App;
