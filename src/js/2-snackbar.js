import iziToast from "izitoast/dist/js/iziToast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');


form.addEventListener('submit', function (event) {
  event.preventDefault();

  
  const delayInput = document.querySelector('input[name="delay"]');
  const stateInputs = document.querySelectorAll('input[name="state"]');
  
  
  const delay = parseInt(delayInput.value);
  const state = Array.from(stateInputs).find(input => input.checked).value;

  
  const promise = new Promise((resolve, reject) => {
    
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  
  promise.then((delay) => {
   
    iziToast.success({
      title: "Fulfilled promise",
      message: `✅ Fulfilled promise in ${delay}ms`,
    });
  }).catch((delay) => {
    
    iziToast.error({
      title: "Rejected promise",
      message: `❌ Rejected promise in ${delay}ms`,
    });
  });
});
