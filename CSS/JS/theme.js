/**
 * Theme module - Dark/light mode toggle
 */
export function initTheme() {
  const body = document.body;
  const themeToggle = document.querySelector('.header__theme-toggle');

  // Load saved theme
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    body.classList.add('body--dark');
    if (themeToggle) themeToggle.textContent = '☀️';
  } else {
    if (themeToggle) themeToggle.textContent = '🌙';
  }

  // Toggle on click
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('body--dark');
      if (body.classList.contains('body--dark')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
      } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
      }
    });
  }
}
