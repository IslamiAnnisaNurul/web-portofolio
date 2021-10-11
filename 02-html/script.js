const database = new Map();
const input = document.getElementById('userInput');
const button = document.getElementById('enterItems');
const ul = document.getElementsByTagName('ul')[0];

function inputLength() {
  return input.value.length;
}

function createListElement() {
  const ITEM_KEY = input.value.toUpperCase();
  const ITEM_VALUE = input.value;
  // WARN: Handle error, empty input
  if (ITEM_VALUE === '') {
    alert("Item Name can't be blank");
    input.focus();
    return;
  }

  // WARN: Check for duplication
  if (database.has(ITEM_KEY)) {
    alert(`You already have ${ITEM_VALUE}`);
    input.value = '';
    input.focus();
    return;
  }

  // NOTE: Add the new item to database
  database.set(ITEM_KEY, ITEM_VALUE);

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(input.value));
  ul.appendChild(li);
  const button = document.createElement('button');
  button.appendChild(document.createTextNode('x'));
  li.appendChild(button);
  input.value = '';
}

function addListAfterClick() {
  if (inputLength() > 0) {
    createListElement();
  }
}

function addListAfterKeypress(event) {
  if (inputLength() > 0 && event.keyCode === 13) {
    createListElement();
  }
}

function crossIfDone(event) {
  if (event.target && event.target.nodeName === 'LI') {
    event.target.classList.toggle('done');
  }
}

function deleteItem(event) {
  if (event.target && event.target.tagName === 'BUTTON') {
    return event.target.parentElement.remove();
  }
}

button.addEventListener('click', addListAfterClick);

input.addEventListener('keypress', addListAfterKeypress);

ul.addEventListener('click', crossIfDone);

ul.addEventListener('click', deleteItem);
