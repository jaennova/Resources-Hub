// Cargar los recursos desde el JSON
async function loadResources() {
    try {
        const response = await fetch('resources.json');
        const data = await response.json();
        return data.resources;
    } catch (error) {
        console.error('Error loading resources:', error);
        return [];
    }
}

// Generar los botones de tags únicos
function generateTagButtons(resources) {
    const uniqueTags = new Set();
    resources.forEach(resource => {
        resource.tags.forEach(tag => uniqueTags.add(tag));
    });

    const tagButtonsContainer = document.getElementById('tag-buttons');
    uniqueTags.forEach(tag => {
        const button = document.createElement('button');
        button.className = 'tag-button btn btn-secondary m-1';
        button.setAttribute('data-tag', tag);
        button.textContent = tag.replace('-', ' ').toUpperCase();
        button.addEventListener('click', () => {
            localStorage.setItem('selectedTag', tag);
            filterCards(tag);
        });
        tagButtonsContainer.appendChild(button);
    });
}

// Generar las tarjetas de recursos
function generateResourceCards(resources) {
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = '';

    resources.forEach(resource => {
        const card = document.createElement('div');
        card.className = 'col-lg-3 col-md-6 mb-4 mx-4 card-container';
        card.setAttribute('data-tag', resource.tags.join(' '));

        card.innerHTML = `
            <div class="card">
                <a href="${resource.url}" target="_blank">
                    <div class="image-container">
                        <img src="${resource.imageUrl}" alt="Logo ${resource.name}">
                    </div>
                    <div class="content">
                        <h3>${resource.name}</h3>
                        <p>${resource.description}</p>
                    </div>
                </a>
            </div>
        `;

        mainContainer.appendChild(card);
    });
}

// Función para filtrar las tarjetas
function filterCards(tag) {
    document.querySelectorAll('.card-container').forEach(card => {
        const cardTags = card.dataset.tag.split(' ');
        if (tag === 'all' || cardTags.includes(tag)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Inicializar la página
async function initializePage() {
    const resources = await loadResources();
    generateTagButtons(resources);
    generateResourceCards(resources);

    // Aplicar filtro guardado
    const selectedTag = localStorage.getItem('selectedTag');
    if (selectedTag) {
        filterCards(selectedTag);
    }
}

// Cargar la página
window.onload = initializePage;
