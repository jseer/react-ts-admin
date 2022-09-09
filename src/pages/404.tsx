import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NoFoundPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate('/overview')}>
          返回首页
        </Button>
      }
    />
  );
};

export default NoFoundPage;
