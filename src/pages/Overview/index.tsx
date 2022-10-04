import { useEffect, useState } from 'react';
import { Card, Col, Radio, Row } from 'antd';
import styles from './index.module.less';
import Status from '@/components/Status';
import {
  getContinuousLoginDays,
  getCountMap,
  ICountMap,
  ICountType,
} from '@/api/system';
import { useAppSelector } from '@/hooks/store';
import { USER_TYPE } from '@/utils/common';
import CountCharts from './components/CountCharts';

const options = [
  { label: '今日', value: 'today' },
  { label: '本周', value: 'week' },
  { label: '本月', value: 'month' },
];

const Overview: React.FC = () => {
  const [loginDays, setLoginDays] = useState(0);
  const [countType, setCountType] = useState<ICountType>('today');
  const [countMap, setCountMap] = useState<ICountMap>({} as ICountMap);
  const { userInfo } = useAppSelector((state) => {
    const { userInfo } = state.global;
    return {
      userInfo,
    };
  });
  useEffect(() => {
    if (userInfo?.type === USER_TYPE.ACCOUNT) {
      getContinuousLoginDays().then((data) => {
        setLoginDays(data);
      });
    }
  }, [userInfo]);

  useEffect(() => {
    getCountMap(countType).then((data) => {
      setCountMap(data);
    });
  }, [countType]);

  return (
    <div className={styles.overview}>
      {userInfo?.type === USER_TYPE.ACCOUNT && (
        <div className={styles.welcome}>
          欢迎，你已连续登录{loginDays || '--'}天了
        </div>
      )}
      <Row gutter={16} className={styles.viewCard}>
        <Col span={24}>
          <div className={styles.countType}>
            <Radio.Group
              options={options}
              onChange={(e) => {
                setCountType(e.target.value);
              }}
              value={countType}
              optionType='button'
              buttonStyle='solid'
            />
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.viewCardItem}>
            <div className={styles.cardTitle}>新增用户数</div>
            <div className={styles.cardText}>
              <Status type='success'>{countMap.newUser}</Status>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.viewCardItem}>
            <div className={styles.cardTitle}>用户登录次数</div>
            <div className={styles.cardText}>
              <Status type='success'>{countMap.login}</Status>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.viewCardItem}>
            <div className={styles.cardTitle}>游客数</div>
            <div className={styles.cardText}>
              <Status type='success'>{countMap.tourist}</Status>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.viewCardItem}>
            <div className={styles.cardTitle}>用户总数</div>
            <div className={styles.cardText}>
              <Status type='success'>{countMap.userTotal}</Status>
            </div>
          </div>
        </Col>
      </Row>
      <Card>
        <Row>
          <Col span={12}>
            <CountCharts/>
          </Col>
          <Col span={12}></Col>
        </Row>
      </Card>
    </div>
  );
};

export default Overview;
