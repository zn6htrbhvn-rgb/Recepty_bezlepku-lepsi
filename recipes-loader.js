// ============================================
// NAČÍTÁNÍ RECEPTŮ Z FIREBASE
// ============================================
// Tento skript načítá recepty z Firebase Firestore
// a zobrazuje je na stránkách recepty.html a index.html

async function loadFirebaseRecipes(containerId, limit = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
        let query = db.collection('recipes').orderBy('createdAt', 'desc');
        if (limit) {
            query = query.limit(limit);
        }

        const snapshot = await query.get();

        if (snapshot.empty) {
            showRecipesStatus(container, 'Zatím tu nejsou žádné recepty. Brzy přibudou!');
            return;
        }

        // Fotka nejnovějšího receptu do úvodního bloku (jen na úvodní stránce)
        const first = snapshot.docs[0];
        if (first) showHeroRecipe(first.id, first.data());

        snapshot.forEach(doc => {
            const recipe = doc.data();
            const card = document.createElement('a');
            card.href = `recept.html?id=${doc.id}`;
            card.className = 'recipe-preview-card firebase-recipe';
            card.innerHTML = `
                <div class="recipe-image">
                    ${recipe.imageUrl 
                        ? `<img src="${recipe.imageUrl}" alt="${recipe.name}">` 
                        : `<div class="recipe-image-placeholder">
                            <span>🍽️</span>
                           </div>`
                    }
                </div>
                <h3>${recipe.name}</h3>
                <p>${recipe.description || 'Bezlepkový recept'}</p>
            `;

            // Animace
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            container.appendChild(card);

            // Trigger animace
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        });
    } catch (error) {
        console.warn('Firebase recepty se nepodařilo načíst:', error.message);
        showRecipesStatus(container, 'Recepty se teď nepodařilo načíst. Zkuste stránku obnovit.');
    }
}

function showRecipesStatus(container, text) {
    const status = document.createElement('p');
    status.className = 'recipes-status';
    status.textContent = text;
    container.appendChild(status);
}

function showHeroRecipe(id, recipe) {
    const media = document.getElementById('hero-media');
    if (!media || !recipe.imageUrl) return;

    const img = document.createElement('img');
    img.alt = recipe.name || '';
    img.addEventListener('load', () => {
        img.classList.add('is-loaded');
        media.classList.add('has-image');
    });
    img.src = recipe.imageUrl;
    media.insertBefore(img, media.firstChild);

    const caption = media.querySelector('.hero-media-caption');
    if (caption && recipe.name) {
        const link = document.createElement('a');
        link.href = `recept.html?id=${id}`;
        link.textContent = recipe.name;
        caption.appendChild(link);
        caption.hidden = false;
    }
}

// Automatické načtení na příslušných stránkách
document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (currentPage === 'recepty.html') {
        loadFirebaseRecipes('firebase-recipes-grid');
    }

    if (currentPage === 'index.html' || currentPage === '') {
        loadFirebaseRecipes('firebase-homepage-recipes', 3);
    }
});