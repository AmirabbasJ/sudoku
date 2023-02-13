import { useTheme } from '@sudoku/hooks';
import { ThemeProvider as StyledComponentThemeProvider } from 'styled-components';

import { GlobalStyle } from './GlobalStyles';
import { darkTheme, lightTheme } from './theme';

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const { theme } = useTheme();
  return (
    <StyledComponentThemeProvider
      theme={theme === 'dark' ? darkTheme : lightTheme}
    >
      <GlobalStyle />
      {children}
    </StyledComponentThemeProvider>
  );
};
