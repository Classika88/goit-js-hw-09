import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
let deadline = new Date();
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    deadline = selectedDates[0];
    if (new Date() < selectedDates[0]) {
      startBtn.disabled = false;
    } else {
      startBtn.disabled = true;
      Notiflix.Notify.warning('Please choose a date in the future');
    }
  },
};
const startBtn = document.querySelector('button');

flatpickr('#datetime-picker', options);
startBtn.disabled = true;

startBtn.addEventListener('click', () => {
  let timerId = setInterval(() => {
    startBtn.disabled = true;
    const interval = convertMs(deadline - new Date());
    console.log(interval);
    console.log(interval.days);

    document.querySelector('span[data-days]').textContent = String(
      interval.days
    ).padStart(2, 0);
    document.querySelector('span[data-hours]').textContent = String(
      interval.hours
    ).padStart(2, 0);
    document.querySelector('span[data-minutes]').textContent = String(
      interval.minutes
    ).padStart(2, 0);
    document.querySelector('span[data-seconds]').textContent = String(
      interval.seconds
    ).padStart(2, 0);
    if (
      interval.days + interval.hours + interval.minutes + interval.seconds <=
      0
    ) {
      clearInterval(timerId);
    }
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
