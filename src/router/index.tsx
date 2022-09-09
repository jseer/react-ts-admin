import HashRouter from './HashRouter';
import routes from './routes';
import { useRoutes } from 'react-router-dom';
import { createHashHistory } from 'history';

export const history = createHashHistory({ window });

function Routes() {
  return useRoutes(routes);
}
function Router() {
  return (
    <HashRouter history={history}>
      <Routes />
    </HashRouter>
  );
}

export default Router;
