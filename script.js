// Base URL for the API
const API_BASE_URL = 'https://repo-tech.onrender.com';

// Load resources from the API
async function loadResources() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/resources/`);
        const data = await response.json();
        return data.map(resource => ({
            name: resource.title,
            url: resource.url,
            imageUrl: resource.image,
            description: resource.description,
            tags: resource.tags
        }));
    } catch (error) {
        console.error('Error loading resources:', error);
        return [];
    }
}

// Load categories from the API
async function loadCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/categories/`);
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error('Error loading categories:', error);
        return [];
    }
}

// Generate tag buttons from categories
async function generateTagButtons(resources) {
    const uniqueTags = new Set();
    resources.forEach(resource => {
        resource.tags.forEach(tag => uniqueTags.add(tag));
    });

    const tagButtonsContainer = document.getElementById('tag-buttons');
    // Add "All" button
    const allButton = document.createElement('button');
    allButton.className = 'tag-button btn btn-secondary m-1';
    allButton.setAttribute('data-tag', 'all');
    allButton.textContent = 'TODOS';
    allButton.addEventListener('click', () => {
        localStorage.setItem('selectedTag', 'all');
        filterCards('all');
    });
    tagButtonsContainer.appendChild(allButton);

    // Add rest of tag buttons
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

// Generate resource cards
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

// Filter cards
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

// Initialize page
async function initializePage() {
    const resources = await loadResources();
    generateTagButtons(resources);
    generateResourceCards(resources);

    // Apply saved filter
    const selectedTag = localStorage.getItem('selectedTag');
    if (selectedTag) {
        filterCards(selectedTag);
    }
}

// Load page
window.onload = initializePage;

// Function to create a new resource
async function createResource(resourceData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/resources/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: resourceData.name,
                description: resourceData.description,
                image: resourceData.imageUrl,
                url: resourceData.url,
                tags: resourceData.tags,
                status: 'pending'
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Error creating resource:', error);
        throw error;
    }
}
