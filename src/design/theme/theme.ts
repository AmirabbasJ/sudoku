export const lightTheme = {
  primary: '#4169e1',
  secondary: '#ebeff4',
  bg: '#FCFCFC',
  error: '#ff6347',
  warning: '#e1c441',
  bgSubtle: '#ffffff',
  bgError: '#ffdbdb',
  primaryEmphasized: '#b6d8ff',
  secondaryHover: '#dce3ed',
  secondaryActive: '#BFD2EC',
  secondaryMuted: '#adb7c3',
  textSecondary: '#ffffff',
  textPrimary: '#000000',
  textMuted: '#465466',
  border: '#9fc9fc',
};

export const darkTheme: Theme = {
  primary: '#4169e1',
  secondary: '#25242C',
  bg: '#171719',
  error: '#ff6347',
  warning: '#e1c441',
  bgSubtle: '#25242C',
  bgError: '#3D0000',
  primaryEmphasized: '#132D7C',
  secondaryHover: '#1C1C22',
  secondaryActive: '#16161B',
  secondaryMuted: '#2E2E38',
  textSecondary: '#ffffff',
  textPrimary: '#ffffff',
  textMuted: '#5B6D86',
  border: '#000000',
};

export type Theme = typeof lightTheme;
