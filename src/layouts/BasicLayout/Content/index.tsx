import Authentized from '@/components/Authentized';
import Loading from '@/components/Loading';
import { useAppSelector } from '@/hooks/store';
import { Layout } from 'antd';
import { useMemo } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { pathToRegexp } from "path-to-regexp";

const { Content: AContent } = Layout;
const Content: React.FC = () => {
  const { authPageList, authPageListLoading } = useAppSelector((state)=> ({
    authPageList: state.global.authPageList,
    authPageListLoading: state.global.authPageListLoading,
  }));
  const location = useLocation();
  const Outlet = useOutlet();
  const authory = useMemo(() => {
    return authPageList.some((page) => {
      if(page.path) {
        return pathToRegexp(page.path).test(location.pathname);
      }
    });
  }, [location.pathname, authPageList]);
  return (
    <AContent style={{ padding: 20, height: '100%', overflow: 'auto' }}>
      {authPageListLoading ? (
        <Loading/>
      ) : (
        <Authentized authory={authory}>
        {Outlet}
      </Authentized>
      )}
    </AContent>
  );
};

export default Content;
