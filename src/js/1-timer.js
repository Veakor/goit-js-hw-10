import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast/dist/js/iziToast";
import "izitoast/dist/css/iziToast.min.css";


let userSelectedDate;
let timerInterval; 

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];

        if (userSelectedDate < new Date()) {
            iziToast.error({
                title: "Error",
                message: "Please choose a date in the future",
            });

            document.querySelector('[data-start]').disabled = true;
        } else {
            document.querySelector('[data-start]').disabled = false;
        }
    },
};

flatpickr("#datetime-picker", options);

document.querySelector('[data-start]').addEventListener('click', () => {
    if (userSelectedDate && userSelectedDate > new Date()) {
        
        clearInterval(timerInterval);
        startTimer(userSelectedDate);
    }
});

function startTimer(endDate) {
    timerInterval = setInterval(() => {
        const timeDifference = endDate - new Date();

        if (timeDifference <= 0) {
            clearInterval(timerInterval);
            updateTimerUI(0, 0, 0, 0);
            iziToast.success({
                title: "Success",
                message: "Time's up!",
            });
        } else {
            const { days, hours, minutes, seconds } = convertMs(timeDifference);
            updateTimerUI(days, hours, minutes, seconds);
        }
    }, 1000);
}

function updateTimerUI(days, hours, minutes, seconds) {
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}