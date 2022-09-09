import { useLayoutEffect, useState } from 'react';
import type { HashHistory } from 'history';
import { Router } from 'react-router';

export interface HashRouterProps {
  basename?: string;
  children?: React.ReactNode;
  history: HashHistory;
}

export default function HashRouter({
  basename,
  children,
  history,
}: HashRouterProps) {
  let [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);
  return (
    <Router
      basename={basename}
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
}
