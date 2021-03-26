import styled from 'styled-components';

export default {
  MenuButtonWrapper: styled.div`
    height: 2rem;
    width: 2.5rem;
    padding: 8px;
    border: 2px solid white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & div {
      width: 100%;
      height: 2px;
      background-color: white;
    } 
  `,
};
