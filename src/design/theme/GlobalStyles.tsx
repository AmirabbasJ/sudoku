import * as styled from 'styled-components';

import Roboto from '../../assets/Roboto-Light.ttf';

export const GlobalStyle = styled.createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url(${Roboto}) format('truetype');
    font-display: block;
  }
  * {
    font-family: 'Roboto';
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    user-select: none;
  }
`;
