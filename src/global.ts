import { ConfigProvider } from 'antd';
import BrowserTracer from '@zjseer/browser-tracer';

// antd
ConfigProvider.config({
  prefixCls: 'admin',
  iconPrefixCls: 'adminicon',
});

BrowserTracer.init({
  projectId: 1,
  debug: true,
  dsn: 'http://119.29.155.42/api/trace/send',
})
