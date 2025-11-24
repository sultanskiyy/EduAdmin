// js/main.js — Dark/Light Mode (100% ishlaydi!)

const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Sahifa yuklanganda saqlangan rejimni qoʻllash
if (localStorage.getItem('theme') === 'light') {
    html.classList.remove('dark');
} else {
    html.classList.add('dark');
}

// Tugma bosilganda rejimni almashtirish
themeToggle.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
});