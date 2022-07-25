import { useContext } from 'react';

import type { ThemeType } from '../context/ThemeCtx';
import { ThemeCtx } from '../context/ThemeCtx';

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
