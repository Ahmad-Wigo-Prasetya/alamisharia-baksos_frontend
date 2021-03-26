import Header from 'components/molecules/header';
import Drawer from 'components/molecules/drawer';
import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

function NavigationBar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const LIST_ITEM = useMemo(() => [
    {
      label: 'Product',
      icon: <div>icon</div>,
      path: '/',
    },
    {
      label: 'Product',
      icon: <div>icon</div>,
      path: '/product',
    },
    {
      label: 'Parameter Group',
      icon: <div>icon</div>,
      path: '/parameter-group',
    },
  ], []);

  const drawerClick = (status) => () => {
    setOpen(status);
  };

  return (
    <>
      <Header
        title={LIST_ITEM.filter((item) => item.path === location.pathname)[0].label}
        onDrawerMenuClick={drawerClick(true)}
      />
      <Drawer
        listItem={LIST_ITEM.slice(1)}
        isOpen={open}
        onClose={drawerClick(false)}
      />
    </>
  );
}

export default NavigationBar;
