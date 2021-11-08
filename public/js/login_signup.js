const loginForm = document.querySelector('.login-form');
const loginButton = document.querySelector('.login');
const signupForm = document.querySelector('.signup-form');
const signupButton = document.querySelector('.signup');
const formButton = document.querySelector('.btn');
const formInput = document.querySelector('.input');

signupButton.classList.add('active');
loginButton.classList.add('inactive');
signupForm.style.display = 'block';
loginForm.style.display = 'none';

function ready() {
  if (document.readyState !== 'loading') {
    loginButton.addEventListener('click', () => {
      signupForm.style.display = 'none';
      signupButton.classList.remove('active');
      signupButton.classList.add('inactive');
      
      loginForm.style.display = 'block';
      loginButton.classList.add('active');
    });
    
    signupButton.addEventListener('click', () => {
      signupForm.style.display = 'block';
      signupButton.classList.remove('inactive');
      signupButton.classList.add('active');
      
      loginForm.style.display = 'none';
      loginButton.classList.remove('active');
      loginButton.classList.add('inactive');
    });
    
    formButton.addEventListener('click', () => {
      formInput.value = '';
    });
  } else {
    console.log('not ready');
  }
}

ready();
