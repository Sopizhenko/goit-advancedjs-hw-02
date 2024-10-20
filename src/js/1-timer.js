import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import '../css/1-timer.css';

let userSelectedDate;
const startBtn = document.querySelector('button');

const dateInput = document.getElementById('datetime-picker');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < Date.now()) {
      startBtn.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    } else if (selectedDate > Date.now()) {
      startBtn.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
};

flatpickr(dateInput, options);

// Start timer
startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  dateInput.disabled = true;

  const intervalId = setInterval(() => {
    const currentDate = Date.now();
    const deltaTime = userSelectedDate - currentDate;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    if (deltaTime < 0) {
      clearInterval(intervalId);
      startBtn.disabled = false;
      dateInput.disabled = false;
      iziToast.success({
        title: 'Success',
        message: 'Timer has finished!',
      });
    }

    function pad(value) {
      return String(value).padStart(2, '0');
    }

    document.querySelector('[data-days]').textContent = pad(days);
    document.querySelector('[data-hours]').textContent = pad(hours);
    document.querySelector('[data-minutes]').textContent = pad(minutes);
    document.querySelector('[data-seconds]').textContent = pad(seconds);
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
