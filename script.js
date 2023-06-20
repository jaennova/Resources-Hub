document.querySelectorAll('.tag-button').forEach(button => {
  button.addEventListener('click', () => {
    const tag = button.dataset.tag;
    localStorage.setItem('selectedTag', tag); // Guardar la etiqueta seleccionada en el localStorage
    filterCards(tag);
  });
});

// Función para filtrar las tarjetas según la etiqueta seleccionada
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

// Al cargar la página, comprobar si hay una etiqueta seleccionada guardada en el localStorage
window.onload = function() {
  const selectedTag = localStorage.getItem('selectedTag');
  if (selectedTag) {
    filterCards(selectedTag);
  }
}

