import { initData } from '@/api/system';
import { notification, Spin } from 'antd';
import { useState } from 'react';
import styles from './index.module.less';

const GlobalInfoTip: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const init = async () => {
    try {
      setLoading(true);
      await initData();
      notification.success({
        message: `初始化成功`,
      });
    } catch(e: any) {
      console.log(e);
    }
    setLoading(false);
  }
  return (
    <div className={styles.globalInfoTip}>
      {loading ? (
         <span className={styles.message}>
          <Spin/>
          <span className={styles.initMessage}>初始化中...</span>
         </span>
      ) : (
        <>
          <span className={styles.message}>本站为开源环境,遇到问题可重新</span>
        <span className={styles.initBtn} onClick={init}>初始化</span>
        <span className={styles.message}>数据</span>
        </>
      )}
      
    </div>
  )
}

export default GlobalInfoTip;