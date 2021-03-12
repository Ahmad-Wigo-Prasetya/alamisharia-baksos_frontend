import React from 'react';
import PropTypes from 'prop-types';
import Styled from './styled';

export default function Button({
  label, onClick, width, color,
}) {
  return (
    <Styled.Button
      onClick={onClick}
      width={width}
      color={color}
    >
      {label}
    </Styled.Button>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  width: PropTypes.string,
  color: PropTypes.string,
};

Button.defaultProps = {
  label: '',
  onClick: () => null,
  width: '100%',
  color: 'blue',
};
