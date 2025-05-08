
import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        setTheme(storedTheme);
        document.documentElement.classList.toggle('dark', storedTheme === 'dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="ml-2 p-2 rounded-full bg-[#eebbc3] dark:bg-[#b8c1ec] text-[#232946] dark:text-[#232946] hover:bg-[#b8c1ec] dark:hover:bg-[#eebbc3] transition"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
