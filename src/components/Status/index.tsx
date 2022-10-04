import {} from 'antd';
import { PropsWithChildren, useState } from 'react';
import styles from './index.module.less';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Status: React.FC<
  PropsWithChildren<{ type: 'success' | 'error' | 'warning' }>
> = (props) => {
  const { children, type } = props;
  return (
    <div className={styles.status}>
      <span className={cx([styles.dot, styles[type]])}></span>
      <span className={styles.text}>{children}</span>
    </div>
  );
};

export default Status;
