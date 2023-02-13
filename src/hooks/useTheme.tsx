import type { ThemeType } from '@sudoku/context';
import { ThemeCtx } from '@sudoku/context';
import { useContext } from 'react';

const setPersistentTheme = (theme: ThemeType) => {
  localStorage.setItem('theme', theme);
};

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeCtx);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setPersistentTheme(newTheme);
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
};
