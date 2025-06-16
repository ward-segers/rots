'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const constructionBanner = document.getElementById('construction-banner');
  if (constructionBanner) {
    const closeButton = constructionBanner.querySelector('#close-banner');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        constructionBanner.classList.add('hidden');
      });
    }
  }
});