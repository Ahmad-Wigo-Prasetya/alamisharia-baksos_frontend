import React from 'react';
import './App.css';
import {
  Redirect,
  Route, BrowserRouter as Router, Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCookie } from 'utils/cookies';
import Main from 'pages';

const PrivateRouter = (props) => {
  // hanya bisa diakses ketika memiliki accesstoken
  const { component: Component, children, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(renderProps) => {
        if (getCookie('_at')) {
          return <Component {...renderProps} />;
        }
        // eslint-disable-next-line no-return-assign
        return window.location.pathname = '/login';
      }}
    >
      {children}
    </Route>
  );
};

PrivateRouter.defaultProps = {
  children: <></>,
};

PrivateRouter.propTypes = {
  component: PropTypes.node.isRequired,
  children: PropTypes.node,
};

const NonAuthRouter = ({ component: Component, ...rest }) => (
  // hanya bisa diakses ketika tidak memiliki accesstoken
  <Route
    {...rest}
    render={(props) => {
      const isLoggedIn = getCookie('_at');
      return isLoggedIn ? <Redirect to="/" /> : <Component {...props} />;
    }}
  />
);

NonAuthRouter.defaultProps = {
  children: <></>,
};

NonAuthRouter.propTypes = {
  component: PropTypes.node.isRequired,
  children: PropTypes.node,
};

function App() {
  return (
    <Router>
      <Switch>
        {/* <NonAuthRouter component={() => <div>asdas</div>} exact path="/login" />
        <NonAuthRouter component={Dashboard} exact path="/" />
        <PrivateRouter component={() => <div>asdsad</div>} path="/" /> */}
        <Route component={Main} path="/" />
      </Switch>
    </Router>
  );
}

export default App;
