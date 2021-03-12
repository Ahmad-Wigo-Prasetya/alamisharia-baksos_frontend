import styled from 'styled-components';

export default {
  Button: styled.button`
    width: ${(props) => props.width};
    background-color: ${(props) => (props.color ? '' : 'blue')}
  `,
};
