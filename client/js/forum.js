document.addEventListener('DOMContentLoaded', async function() {
  // Vérifier l'authentification
  const token = localStorage.getItem('token');
  if (!token && location.pathname !== '/index.html') {
    window.location.href = 'index.html';
    return;
  }
  
  // Charger les posts
  try {
    const response = await fetch('http://localhost:3000/api/posts', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const { data: posts } = await response.json();
    
    const postsContainer = document.querySelector('.posts');
    postsContainer.innerHTML = '';
    
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.className = 'post';
      postElement.innerHTML = `
        <div class="post-header">
          <span class="username">${post.anonymousName}</span>
          <span class="post-time">${new Date(post.createdAt).toLocaleString()}</span>
        </div>
        <div class="post-content">
          <p>${post.content}</p>
        </div>
        <div class="post-actions">
          <button>Répondre</button>
          <button>Like (${post.likes})</button>
        </div>
      `;
      postsContainer.appendChild(postElement);
    });
  } catch (err) {
    console.error('Erreur lors du chargement des posts:', err);
  }
  
  // Gestion des nouveaux posts
  const postButton = document.querySelector('.new-post button');
  const postTextarea = document.querySelector('.new-post textarea');
  
  if (postButton && postTextarea) {
    postButton.addEventListener('click', async function() {
      const content = postTextarea.value.trim();
      if (!content) return;
      
      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ content })
        });
        
        const { data: newPost } = await response.json();
        
        const postsContainer = document.querySelector('.posts');
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
          <div class="post-header">
            <span class="username">${newPost.anonymousName}</span>
            <span class="post-time">À l'instant</span>
          </div>
          <div class="post-content">
            <p>${newPost.content}</p>
          </div>
          <div class="post-actions">
            <button>Répondre</button>
            <button>Like (0)</button>
          </div>
        `;
        
        postsContainer.insertBefore(postElement, postsContainer.firstChild);
        postTextarea.value = '';
      } catch (err) {
        console.error('Erreur lors de la création du post:', err);
      }
    });
  }
  
  // Déconnexion
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      localStorage.removeItem('token');
      localStorage.removeItem('anonymousName');
      window.location.href = 'index.html';
    });
  }
});