import { createGlobalStyle } from 'styled-components';

import Roboto from './assets/Roboto-Light.ttf';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url(${Roboto}) format('truetype');
  }
  
  *{    
    font-family: 'Roboto';
    padding:0;
    margin:0;
    box-sizing:border-box;  
    user-select: none;
  }
`;
