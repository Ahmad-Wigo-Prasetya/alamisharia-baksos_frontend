import {
  AppBar, IconButton, Toolbar, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Styled from './styled';

function Header({ onDrawerMenuClick, title }) {
  const handleClick = () => {
    onDrawerMenuClick();
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={handleClick} edge="start" color="inherit" aria-label="menu">
          <Styled.MenuButtonWrapper>
            <div />
            <div />
            <div />
          </Styled.MenuButtonWrapper>
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography variant="h6">
          {title}
        </Typography>
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  );
}

Header.defaultProps = {
  onDrawerMenuClick: () => null,
  title: '',
};

Header.propTypes = {
  onDrawerMenuClick: PropTypes.func,
  title: PropTypes.string,
};

export default Header;
