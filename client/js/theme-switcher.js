document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const theme = document.getElementById('theme');
    
    // Vérifier le thème sauvegardé ou utiliser le dark par défaut
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        theme.href = 'css/theme-light.css';
        themeToggle.textContent = 'Thème Dark';
    }
    
    themeToggle.addEventListener('click', function() {
        if (theme.href.includes('theme-dark.css')) {
            theme.href = 'css/theme-light.css';
            themeToggle.textContent = 'Thème Dark';
            localStorage.setItem('theme', 'light');
        } else {
            theme.href = 'css/theme-dark.css';
            themeToggle.textContent = 'Thème Light';
            localStorage.setItem('theme', 'dark');
        }
    });
});