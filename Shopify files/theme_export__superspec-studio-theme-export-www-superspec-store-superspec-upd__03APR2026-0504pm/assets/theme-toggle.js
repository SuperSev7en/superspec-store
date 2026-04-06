// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get the theme toggle button
  const themeToggle = document.querySelector('.ThemeToggle');
  
  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Update button aria-label and icon based on current theme
  updateThemeToggle(currentTheme);
  
  // Add click event listener to theme toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      // Update theme
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Update button aria-label and icon
      updateThemeToggle(newTheme);
    });
  }
});

function updateThemeToggle(theme) {
  const themeToggle = document.querySelector('.ThemeToggle');
  if (!themeToggle) return;
  
  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  
  themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
  themeToggle.innerHTML = theme === 'light' ? moonIcon : sunIcon;
}

// Insert button next to currency selector
const localizationForm = document.querySelector('.Header__LocalizationForm');
if (localizationForm) {
  localizationForm.insertBefore(themeToggle, localizationForm.firstChild);
} else {
  document.body.appendChild(themeToggle);
}

// Listen for system theme changes
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
prefersDarkScheme.addListener((e) => {
  if (!localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    updateThemeToggle(e.matches ? 'dark' : 'light');
  }
}); 