document.querySelectorAll('.tag-button').forEach(button => {
    button.addEventListener('click', () => {
      const tag = button.dataset.tag;
      document.querySelectorAll('.card').forEach(card => {
        if (tag === 'all' || card.dataset.tag === tag) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  