const inputEl = document.querySelector('.seconds-input');
const buttonEl = document.querySelector('.button-start');
const resetButton = document.querySelector('.button-reset');
const timerEl = document.querySelector('.timer');

const formattingTime = (time) => {
  if (time < 10 ) return `0${time}`
  return `${time}`
}

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    const convertedSecondsToMinutes = Math.floor(seconds / 60);
    const restOfSeconds = seconds % 60;
    const restOfMinutes = Math.floor(seconds / 60) % 60;
    const hours = Math.floor(convertedSecondsToMinutes / 60);

    timerEl.textContent = `${formattingTime(hours)}:${formattingTime(restOfMinutes)}:${formattingTime(restOfSeconds) }`;
  };
};

const animateTimer = createTimerAnimator();
const paragraph = document.createElement("p");
let seconds = 0;
let interval = null;

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  if (isNaN(inputEl.value)) {
    paragraph.textContent = `${inputEl.value} not a number`;
    paragraph.style.cssText = "color:red; font-size:12px;margin:0";
    document.body.appendChild(paragraph);
    paragraph.after(timerEl);
  }
  return inputEl.value;
});

inputEl.addEventListener("focus",() => {
  if (paragraph.textContent !== "") paragraph.textContent = ""; 
})

buttonEl.addEventListener('click', () => {
  seconds = Number(inputEl.value);

  interval = setInterval(() => {
    if (seconds > 0) {
      animateTimer(seconds);
      seconds = seconds - 1;
    }
    else {
      clearInterval(interval);
      interval = null;
    }
  }, 1000) 

  inputEl.value = '';
});

resetButton.addEventListener("click", () => {
  
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
  seconds = 0;
  animateTimer(seconds);
})