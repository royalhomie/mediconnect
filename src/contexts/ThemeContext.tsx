import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
type MedicalTheme = 'blue' | 'green' | 'orange' | 'purple' | 'teal' | 'rose';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultMedicalTheme?: MedicalTheme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  medicalTheme: MedicalTheme;
  setTheme: (theme: Theme) => void;
  setMedicalTheme: (theme: MedicalTheme) => void;
}

const initialState: ThemeProviderState = {
  theme: 'system',
  medicalTheme: 'blue',
  setTheme: () => null,
  setMedicalTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  defaultMedicalTheme = 'blue',
  storageKey = 'ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [medicalTheme, setMedicalTheme] = useState<MedicalTheme>(
    () => (localStorage.getItem('medical-theme') as MedicalTheme) || defaultMedicalTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('theme-blue', 'theme-green', 'theme-orange');
    root.classList.add(`theme-${medicalTheme}`);
  }, [medicalTheme]);

  const value = {
    theme,
    medicalTheme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    setMedicalTheme: (theme: MedicalTheme) => {
      localStorage.setItem('medical-theme', theme);
      setMedicalTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
