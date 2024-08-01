let todoInput; // treść zadania
let errorInfo; //info o braku zadań / konieczność wpisania tekstu
let addBtn; // dodaje nowe elementy do listy
let ulList; // lista zadań, tagi ul
let newTodo; // nowo dodany li, nowe zadanie
let popup;
let popupInfo; //tekst w popupie, jak się doda pusty tekst
let todoToEdit; // edytowany Todo
let popupInput; // input w popupie
let popupAddBtn; // "zatwierdź"
let popupCloseBtn; // "anuluj"

const main = () => {
	prepareDomElements();
	prepareDomEvents();
};

const prepareDomElements = () => {
	todoInput = document.querySelector('.todo-input');
	errorInfo = document.querySelector('.error-info');
	addBtn = document.querySelector('.btn-add');
	ulList = document.querySelector('.todolist ul');
	popup = document.querySelector('.popup');
	popupInfo = document.querySelector('.popup-info');
	popupInput = document.querySelector('.popup-input');
	popupAddBtn = document.querySelector('.accept');
	popupCloseBtn = document.querySelector('.cancel');
};

const prepareDomEvents = () => {
	addBtn.addEventListener('click', addNewTodo);
	ulList.addEventListener('click', checkClick);
	popupCloseBtn.addEventListener('click', closePopup);
	popupInput.addEventListener('keyup', enterKeyPopup);
	popupAddBtn.addEventListener('click', changeTodoText);
	todoInput.addEventListener('keyup', enterKeyChek);
};

const addNewTodo = () => {
	if (todoInput.value !== '') {
		newTodo = document.createElement('li');
		newTodo.textContent = todoInput.value;
		cerateToolsArea();
		ulList.append(newTodo);
		todoInput.value = '';
		errorInfo.textContent = '';
	} else {
		errorInfo.textContent = 'Wpisz treść zadania';
	}
};

const cerateToolsArea = () => {
	const toolsPanel = document.createElement('div');
	toolsPanel.classList.add('tools');
	newTodo.append(toolsPanel);

	const completeBtn = document.createElement('button');
	completeBtn.classList.add('complete');
	completeBtn.innerHTML = '<i class="fas fa-check"></i>';

	const editBtn = document.createElement('button');
	editBtn.classList.add('edit');
	editBtn.textContent = 'EDIT';

	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('delete');
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

	toolsPanel.append(completeBtn, editBtn, deleteBtn);
};

const checkClick = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed');
		e.target.classList.toggle('completed');
	} else if (e.target.matches('.edit')) {
		editTodo(e);
	} else if (e.target.matches('.delete')) {
		deleteTodo(e);
	}
};

const editTodo = e => {
	todoToEdit = e.target.closest('li');
	popupInput.value = todoToEdit.firstChild.textContent;
	popup.style.display = 'flex';
};

const closePopup = () => {
	popup.style.display = 'none';
	popupInfo.textContent = '';
};

const changeTodoText = () => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value;
		closePopup();
	} else {
		popupInfo.textContent = 'Musisz podać jakąś treść';
	}
};

const deleteTodo = e => {
	e.target.closest('li').remove();

	const allTodos = ulList.querySelectorAll('li');
	if (allTodos.length === 0) {
		errorInfo.textContent = 'Brak zadań na liście.';
	}
};

const enterKeyChek = e => {
	if (e.key === 'Enter') {
		addNewTodo();
	}
};

const enterKeyPopup = e => {
	if (e.key === 'Enter') {
        changeTodoText();
    }
};

document.addEventListener('DOMContentLoaded', main);
