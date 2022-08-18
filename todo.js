/* eslint-env browser */
// https://gobae.tistory.com/18?category=942666
// https://developer.mozilla.org/ko/docs/Web/API/Document/querySelector
const toDoForm = document.querySelector('.toDoForm');
const toDoInput = toDoForm.querySelector('input');
const toDos = document.querySelector('.toDos');
const addTodoButton = document.querySelector('.addBtn');

const TODOLIST = 'toDoList'; // 추가
let toDoList = []; // 추가

function loadToDoList() {
  const loadedToDoList = localStorage.getItem(TODOLIST);
  if (loadedToDoList !== null) {
    const parsedToDoList = JSON.parse(loadedToDoList);
    for (const toDo of parsedToDoList) {
      const { text } = toDo; // Const text = toDo;
      paintToDo(text);
      saveToDo(text);
    }
  }
}

function init() {
  loadToDoList(); // 추가
  // https://developer.mozilla.org/ko/docs/Web/API/EventTarget/addEventListener
  // https://developer.mozilla.org/ko/docs/Web/Events
  toDoForm.addEventListener('submit', createToDo);
  addTodoButton.addEventListener('click', createToDo);
  toDos.addEventListener('click', completeTodo);
}

init();

function saveToDo(toDo) {
  const toDoObject = {
    text: toDo,
    id: toDoList.length + 1,
  };
  toDoList.push(toDoObject);
  localStorage.setItem(TODOLIST, JSON.stringify(toDoList));
}

function createToDo(event) {
  event.preventDefault(); // https://developer.mozilla.org/ko/docs/Web/API/Event/preventDefault
  const toDo = toDoInput.value;
  if (toDo === '') {
    alert('준비물 리스트를 입력해 주세요.');
  }else {
    paintToDo(toDo);
    saveToDo(toDo);
    toDoInput.value = '';
  }
}

function paintToDo(toDo) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const delButton = document.createElement('span');
  delButton.textContent = 'X';
  delButton.classList.add('close');
  delButton.addEventListener('click', delToDo);
  span.innerHTML = toDo;
  li.append(span);
  li.append(delButton);
  li.id = toDoList.length + 1;
  toDos.append(li);
}

function delToDo(event) {
  const { target: button } = event; // Const button = event.target;
  const li = button.parentNode; // ParentNode메서드는 해당 HTML 태그의 부모 태그를 반환한다.
  li.remove();
  // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  toDoList = toDoList.filter((toDo) => toDo.id !== Number(li.id)); // Function (toDo) { return toDo.id !== li.id;}
  localStorage.setItem(TODOLIST, JSON.stringify(toDoList));
}

function completeTodo(event) {
  // const target = (event.target.nodeName == "LI") ? event.target : event.target.closest("LI"); // https://developer.mozilla.org/ko/docs/Web/API/Element/closest
  const target = (event.target.nodeName == "LI") ? event.target : event.target.parentNode;
  if (target.classList.contains('checked')) {
    target.classList.remove('checked');
  } else {
    target.classList.add('checked');
  }
}
