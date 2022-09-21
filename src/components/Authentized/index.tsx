import { Button, Result } from 'antd';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

const Authentized: React.FC<PropsWithChildren<{authory: boolean}>> = ({ children, authory }) => {
  const navigate = useNavigate();
  if (authory) {
    return <>{children}</>;
  }
  return (
    <Result
      status='403'
      title='403'
      subTitle='Sorry, you are not authorized to access this page.'
      extra={
        <Button
          type='primary'
          onClick={() => {
            navigate('/overview');
          }}
        >
          回到首页
        </Button>
      }
    />
  );
};

export default Authentized;
