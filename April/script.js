'use strict';
(() => {
    
   
     const getStoredTheme = () => localStorage.getItem('theme');
     const setStoredTheme = theme => localStorage.setItem('theme', theme);
   
     const getPreferredTheme = () => {
       const storedTheme = getStoredTheme();
       if (storedTheme) return storedTheme;
       return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
     };
   
     const setTheme = theme => {
       if (theme === 'auto') {
         document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
       } else {
         document.documentElement.setAttribute('data-bs-theme', theme);
       }
     };
   
     const updateThemeIcon = theme => {
       const icon = document.getElementById('themeIcon');
       const text = document.getElementById('themeBtnText');
       if (!icon || !text) return;
       if (theme === 'dark') {
         icon.className = 'bi bi-moon-stars';
         text.textContent = 'Dark Mode';
       } else {
         icon.className = 'bi bi-sun-fill';
         text.textContent = 'Light Mode';
       }
     };
   
     window.addEventListener('DOMContentLoaded', () => {
       const currentTheme = getPreferredTheme();
       setTheme(currentTheme);
       updateThemeIcon(currentTheme);
   
       const darkToggleBtn = document.getElementById('darkToggleBtn');
       if (darkToggleBtn) {
         darkToggleBtn.addEventListener('click', () => {
           const current = getStoredTheme() || getPreferredTheme();
           const newTheme = current === 'dark' ? 'light' : 'dark';
           setStoredTheme(newTheme);
           setTheme(newTheme);
           updateThemeIcon(newTheme);
         });
       }
     });
   })();
   