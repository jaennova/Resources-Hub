document.addEventListener('DOMContentLoaded', () => {
  const moreButton = document.querySelector('#more-button');
  const extraButtons = document.querySelectorAll('.extra-button');
  const tagButtons = document.querySelectorAll('.tag-button');

  // Agregar un evento de click al botón "Ver más"
  moreButton.addEventListener('click', () => {
    if (extraButtons[0].style.display === 'none') {
      extraButtons.forEach(button => {
        button.style.display = 'inline-block';
      });
      moreButton.textContent = 'Mostrar menos';
    } else {
      extraButtons.forEach(button => {
        button.style.display = 'none';
      });
      moreButton.textContent = 'Ver más';
    }
  });

  // Agregar eventos de click a los botones de etiqueta
  tagButtons.forEach(button => {
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
  const selectedTag = localStorage.getItem('selectedTag');
  if (selectedTag) {
    filterCards(selectedTag);
  }
});
