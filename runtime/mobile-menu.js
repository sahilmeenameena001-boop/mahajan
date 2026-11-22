const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenu) {
  mobileMenu.querySelector('nav').addEventListener('click', event => {
    if (event.target.closest('a')) mobileMenu.open = false;
  });

  mobileMenu.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !mobileMenu.open) return;
    mobileMenu.open = false;
    mobileMenu.querySelector('summary').focus();
  });
}
