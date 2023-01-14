import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', e => {
  e.preventDefault();

  let delay = Number(form.elements.delay.value);
  let step = form.elements.step.value;
  let amount = form.elements.amount.value;

  for (let i = 0; i < amount; i++) {
    createPromise(i, step * i + delay)
      .then(success => Notiflix.Notify.success(success))
      .catch(error => Notiflix.Notify.failure(error));
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
