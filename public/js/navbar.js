function navbar() {
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const menuContainer = document.querySelector('.menu-container');
  const dropdownWrapper = document.querySelector('.dropdown-wrapper');
  // const overlay = document.querySelector('.overlay');
  if (document.readyState !== 'loading') {
    console.log('ready');
    
    hamburgerIcon.addEventListener('click', () => {
      dropdownWrapper.classList.toggle('hidden');
      dropdownWrapper.classList.toggle('visible');
      menuContainer.classList.toggle('hidden');
      menuContainer.classList.toggle('visible');
      document.body.style.overflow = 'hidden';
    });
    
    menuContainer.addEventListener('click', () => {
      menuContainer.classList.toggle('visible');
      menuContainer.classList.toggle('hidden');
      dropdownWrapper.classList.toggle('visible');
      dropdownWrapper.classList.toggle('hidden');
      document.body.style.overflow = 'auto';
    });
    
    // overlay.addEventListener('click', () => {
    //   document.body.style.overflow = 'auto';
    // });
  } else {
    console.log('not ready');
  }
}

navbar();
