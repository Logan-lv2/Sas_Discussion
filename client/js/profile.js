document.addEventListener('DOMContentLoaded', function() {
    // Changement de pseudo
    const changePseudoBtn = document.getElementById('changePseudo');
    if (changePseudoBtn) {
        changePseudoBtn.addEventListener('click', function() {
            const codes = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
            let newCode = '';
            for (let i = 0; i < 6; i++) {
                newCode += codes.charAt(Math.floor(Math.random() * codes.length));
            }
            document.getElementById('userCode').textContent = newCode;
            alert('Votre nouveau pseudo est: Anonyme_' + newCode);
        });
    }
    
    // Changement de mot de passe
    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmNewPassword').value;
            
            if (newPassword !== confirmPassword) {
                alert('Les mots de passe ne correspondent pas!');
                return;
            }
            
            // Ici, ajouter la logique de changement de mot de passe
            alert('Mot de passe changé avec succès!');
            this.reset();
        });
    }
    
    // Suppression de compte
    const deleteAccountBtn = document.getElementById('deleteAccount');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function() {
            if (confirm('Êtes-vous sûr de vouloir supprimer votre compte? Cette action est irréversible!')) {
                // Ici, ajouter la logique de suppression de compte
                alert('Compte supprimé. Redirection...');
                window.location.href = 'index.html';
            }
        });
    }
    
    // Déconnexion
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Ici, ajouter la logique de déconnexion
            window.location.href = 'index.html';
        });
    }
});