import NavigationBar from 'components/organisms/navigation-bar';
import React from 'react';
import { Route } from 'react-router-dom';
import BaksosList from './baksos/baksos-list';

function Main() {
  return (
    <div>
      <NavigationBar />
      <Route path="/" component={BaksosList} />
    </div>
  );
}

export default Main;
