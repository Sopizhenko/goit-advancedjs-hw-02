import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/2-snackbar.css';

const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const formElements = e.target.elements;
  const delay = formElements.delay.value;
  const state = formElements.state.value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  }).then(
    delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    },
    delay => {
      iziToast.error({
        message: `❌ Promise rejected after ${delay}ms`,
      });
    }
  );
});
