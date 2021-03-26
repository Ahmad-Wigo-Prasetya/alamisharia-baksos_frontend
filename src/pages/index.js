import NavigationBar from 'components/organisms/navigation-bar';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProductList from './product/product-list';
import ParameterGroupList from './parameter/parameter-group-list';

function Main() {
  return (
    <div>
      <NavigationBar />
      <Route path="/">
        <Redirect to="/product" />
      </Route>
      <Switch>
        <Route path="/product" component={ProductList} />
        <Route path="/parameter-group" component={ParameterGroupList} />
        <Route path="/parameter-value" component={() => <div>Parameter Value</div>} />
        <Route path="*" component={() => <div>not Found</div>} />
      </Switch>
    </div>
  );
}

export default Main;
