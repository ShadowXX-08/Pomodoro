import { types } from './contants';
import { btns, startPauseBtn, timerElm } from './elements';
import type { Type } from './types';

let MAX_TIME = 25 * 60; // 25 minutes (seconds)
let intervalId: NodeJS.Timer | null = null;


// HANDLE FUNCTIONS
function handleChangeType(e: MouseEvent) {
  const btn = e.target as HTMLButtonElement;
  const newType = btn.dataset.type as Type;

  btns.forEach(btn => btn.classList.remove('btn-active'));
  btn.classList.add('btn-active');

  document.body.className = '';
  const value = types[newType];
  document.body.classList.add(value.parentClassName);

  changeTimer(newType);
  renderStartButton(newType);
}

function handleStartPause(e: MouseEvent) {
  const currentBtn = e.target as HTMLButtonElement;
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    currentBtn.innerText = 'Start';
  } else {
    startTimer();
    currentBtn.innerText = 'Pause';
  }
}
// UI FUNCTIONS

function renderTimer(minute: number, second: number) {
  const minuteWithPrefix = minute.toString().padStart(2, '0');
  const secondWithPrefix = second.toString().padStart(2, '0');
  timerElm.innerText = `${minuteWithPrefix}:${secondWithPrefix}`;
}
function renderStartButton(type: Type) {
  startPauseBtn.style.color = types[type].buttonColor;
}

// LOGIC FUNCTIONS
function startTimer() {
  intervalId = setInterval(() => {
    const [minute, second] = calcTimer();
    renderTimer(minute, second);
  }, 10);
}

function restartTimer() {
  startPauseBtn.innerText = 'Start';
  clearInterval(intervalId!);
  intervalId = null;
  const [minute, second] = calcTimer();
  renderTimer(minute, second);
}

function changeTimer(newType: Type) {
  const value = types[newType];
  MAX_TIME = value.time;
  restartTimer();
}

function calcTimer() {
  const second = MAX_TIME % 60;
  const minute = Math.floor(MAX_TIME / 60);

  if (MAX_TIME === 0) {
    clearInterval(intervalId!);
    intervalId = null;
  }

  MAX_TIME--;

  return [minute, second];
}

function addListeners() {
  btns.forEach(btn => btn.addEventListener('click', handleChangeType));
  startPauseBtn.addEventListener('click', handleStartPause);
}

function init() {
  addListeners();
}

window.addEventListener('load', init);