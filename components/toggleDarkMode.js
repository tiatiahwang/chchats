import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function TogggleDarkMode() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme =
    theme === 'system' ? systemTheme : theme;
  useEffect(() => {
    const isDark = theme === 'dark';
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  const toggleDarkMode = () => {
    const isDark = currentTheme === 'dark';
    setTheme(isDark ? 'light' : 'dark');
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  return (
    <button onClick={toggleDarkMode} className='text-xs'>
      {currentTheme === 'dark' ? (
        <span>LIGHT</span>
      ) : (
        <span>DARK</span>
      )}
    </button>
  );
}
