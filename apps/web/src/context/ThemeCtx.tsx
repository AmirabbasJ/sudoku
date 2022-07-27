import { createContext, useMemo, useState } from 'react';

export type ThemeType = 'dark' | 'light';

interface ThemeCtx {
  theme: ThemeType;
  setTheme: (t: ThemeType) => void;
}

const getPreferTheme = (): ThemeType => {
  const isLightPreferred = window.matchMedia(
    '(prefers-color-scheme: light)',
  ).matches;
  return isLightPreferred ? 'light' : 'dark';
};

const getPersistentTheme = () => {
  const theme = localStorage.getItem('theme');
  return theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : null;
};

export const ThemeCtx = createContext<ThemeCtx | null>(
  null,
) as React.Context<ThemeCtx>;

export const ThemeCtxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeType>(
    () => getPersistentTheme() ?? getPreferTheme(),
  );

  const ctx = useMemo(
    (): ThemeCtx => ({
      theme,
      setTheme,
    }),
    [theme, setTheme],
  );

  return <ThemeCtx.Provider value={ctx}>{children}</ThemeCtx.Provider>;
};
