document.addEventListener('DOMContentLoaded', function() {
  // =============================================
  // Effets Visuels
  // =============================================
  
  // Créer et gérer l'effet de lumière qui suit la souris
  const createLightEffect = () => {
    const lightEffect = document.createElement('div');
    lightEffect.className = 'light-effect';
    document.body.appendChild(lightEffect);
    
    document.addEventListener('mousemove', (e) => {
      lightEffect.style.left = `${e.clientX - 100}px`;
      lightEffect.style.top = `${e.clientY - 100}px`;
    });
  };

  // Animation d'entrée des éléments
  const animateElements = () => {
    const elements = document.querySelectorAll('.card, .post, .auth-form');
    elements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
      
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 150 * (i + 1));
    });
  };

  // =============================================
  // Gestion du Thème
  // =============================================

  const initTheme = () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeLink = document.getElementById('theme');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Appliquer le thème sauvegardé ou la préférence système
    const applyTheme = (theme) => {
      themeLink.href = `css/theme-${theme}.css`;
      document.body.className = `theme-${theme}`;
      if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? 'Thème Light' : 'Thème Dark';
      }
      localStorage.setItem('theme', theme);
    };

    // Priorité: localStorage > préférence système
    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      applyTheme(userPrefersDark ? 'dark' : 'light');
    }

    // Gestion du bouton de changement de thème
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
      });
    }
  };

  // =============================================
  // Authentification
  // =============================================

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('anonymousName', data.anonymousName);
        localStorage.setItem('themePreference', data.themePreference || 'dark');
        window.location.href = 'forum.html';
      } else {
        showNotification(data.message || 'Échec de la connexion', 'error');
      }
    } catch (err) {
      showNotification('Erreur de connexion au serveur', 'error');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
      showNotification('Les mots de passe ne correspondent pas', 'error');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        showNotification('Inscription réussie! Veuillez vous connecter.', 'success');
        setTimeout(() => window.location.href = 'index.html', 1500);
      } else {
        showNotification(data.message || 'Échec de l\'inscription', 'error');
      }
    } catch (err) {
      showNotification('Erreur de connexion au serveur', 'error');
    }
  };

  // =============================================
  // Utilitaires
  // =============================================

  // Afficher des notifications stylisées
  const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  };

  // Vérifier l'authentification
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const authPages = ['index.html', 'inscription.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (!token && !authPages.includes(currentPage)) {
      window.location.href = 'index.html';
    } else if (token && authPages.includes(currentPage)) {
      window.location.href = 'forum.html';
    }

    if (token) {
      // Afficher le nom anonyme si on est sur le forum
      const anonymousName = localStorage.getItem('anonymousName');
      if (anonymousName && document.getElementById('userGreeting')) {
        document.getElementById('userGreeting').textContent = `Connecté en tant que ${anonymousName}`;
      }
    }
  };

  // Gérer la déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('anonymousName');
    window.location.href = 'index.html';
  };

  // =============================================
  // Initialisation
  // =============================================

  // Initialiser les composants
  createLightEffect();
  initTheme();
  checkAuth();
  animateElements();

  // Écouteurs d'événements
  const loginForm = document.getElementById('loginForm');
  if (loginForm) loginForm.addEventListener('submit', handleLogin);

  const registerForm = document.getElementById('registerForm');
  if (registerForm) registerForm.addEventListener('submit', handleRegister);

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

  // Ajouter la classe 'active' à la navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});