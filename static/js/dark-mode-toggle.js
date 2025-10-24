// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('theme-toggle');
  const icon = toggle.querySelector('.theme-icon');
  const THEME_KEY = 'theme-preference';
  
  function updateIcon(isDark) {
    icon.textContent = isDark ? '🌙' : '☀️';
  }
  
  function getCurrentTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light') return 'light';
    if (saved === 'dark') return 'dark';
    // Default to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  function applyTheme(theme) {
    const body = document.body;
    body.classList.remove('light-mode', 'dark-mode');
    
    if (theme === 'light') {
      body.classList.add('light-mode');
      updateIcon(false);
    } else if (theme === 'dark') {
      body.classList.add('dark-mode');
      updateIcon(true);
    } else {
      // System preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      updateIcon(prefersDark);
    }
  }
  
  // Apply saved theme on page load
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    updateIcon(prefersDark);
  }
  
  toggle.addEventListener('click', function() {
    const saved = localStorage.getItem(THEME_KEY);
    
    if (saved === 'dark') {
      // Currently in forced dark mode -> switch to forced light mode
      localStorage.setItem(THEME_KEY, 'light');
      applyTheme('light');
    } else if (saved === 'light') {
      // Currently in forced light mode -> back to system preference
      localStorage.removeItem(THEME_KEY);
      applyTheme(null);
    } else {
      // Currently following system preference -> switch to opposite
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const newTheme = isDark ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, newTheme);
      applyTheme(newTheme);
    }
  });
});

