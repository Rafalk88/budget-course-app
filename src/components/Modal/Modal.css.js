import styled from 'styled-components';

export const Wrapper = styled.aside`
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
`;

export const Content = styled.div`
  background-color: #ffffff;
  position: relative;
  margin: auto;
  width: 300px;
  height: 300px;
  box-shadow: ${({ theme: { colors } }) =>
    `0 5px 10px 2px ${colors.gray.dark}`};
  padding: 20px;
  text-align: center;
`;

export const CloseIcon = styled.div`
  position: absolute;
  right: 7px;
  top: 5px;
  cursor: pointer;
  font-size: 20px;
`;
