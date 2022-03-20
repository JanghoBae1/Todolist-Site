const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function forSave(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  forSave(currentValue);
}

function forAsk() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);

  greeting.classList.add(SHOWING_CN);

  const date = new Date();
  const hours = date.getHours();
  let mention = "Hello";
  if ((0 <= hours && hours <= 4) || 20 < hours) {
    mention = "Good night";
  } else if (hours < 12) {
    mention = "Good morning";
  } else {
    mention = "Good afternoon";
  }

  greeting.innerText = `${mention}, ${text}.`;
}

function forLoad() {
  const currentUser = localStorage.getItem(USER_LS);

  if (currentUser === null) {
    forAsk();
  } else {
    paintGreeting(currentUser);
  }
}
function init() {
  forLoad();
}

init();
