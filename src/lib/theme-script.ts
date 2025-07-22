// This script runs before React hydration to prevent theme flash
export const themeScript = `
  (function() {
    try {
      const theme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      let isDark = false;
      if (theme === '"dark"' || theme === 'dark') {
        isDark = true;
      } else if ((theme === '"system"' || theme === 'system' || !theme) && prefersDark) {
        isDark = true;
      }
      
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch (e) {}
  })()
`.trim()