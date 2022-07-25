import { useState } from 'react';

import type { Theme } from '../theme';
import { darkTheme, lightTheme } from '../theme';

type ThemeType = 'dark' | 'light';

const getPreferTheme = (): ThemeType => {
  const isLightPreferred = window.matchMedia('(prefers-color-scheme: light)').matches;
  return isLightPreferred ? 'light' : 'dark';
};

const getPersistentTheme = () => {
  const theme = localStorage.getItem('theme');
  return theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : null;
};

const setPersistentTheme = (theme: ThemeType) => {
  localStorage.setItem('theme', theme);
};

export const useTheme = () => {
  const [themeColor, setThemeColor] = useState<ThemeType>(() => getPersistentTheme() ?? getPreferTheme());
  const toggleTheme = () => {
    const newTheme = themeColor === 'dark' ? 'light' : 'dark';
    setPersistentTheme(newTheme);
    setThemeColor(newTheme);
  };
  const theme: Theme = themeColor === 'dark' ? darkTheme : lightTheme;
  return { theme, toggleTheme };
};
