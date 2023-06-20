document.querySelectorAll('.tag-button').forEach(button => {
  // Agregar un evento de click al botón "Ver más"
document.querySelector('#more-button').addEventListener('click', () => {
  const moreButton = document.querySelector('#more-button');
  const extraButtons = document.querySelectorAll('.extra-button');

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
// Si los botones extra están ocultos, mostrarlos y cambiar el texto del botón a "Mostrar menos"
if (extraButtons[0].style.display === 'none') {
  extraButtons.forEach(button => {
    button.style.display = 'inline-block';
  });
  moreButton.textContent = 'Mostrar menos';
}
// Si los botones extra están visibles, ocultarlos y cambiar el texto del botón a "Ver más"
else {
  extraButtons.forEach(button => {
    button.style.display = 'none';
  });
  moreButton.textContent = 'Mostrar mas';
}
});