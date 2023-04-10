"use strict";
// Select elements
const btnSubmit = document.getElementById('add-btn');
const inputTodo = document.getElementById('input');
const formTodo = document.getElementById('add-list');
const todoList = document.querySelector('.list');
const btnDeleteAll = document.getElementById('delete-all');
// 1 ADD FORM EVENT LISTENER
formTodo.addEventListener('submit', e => handleSubmit(e));
// 2 HANDLE SUBMIT FN
const handleSubmit = (e) => {
    e.preventDefault();
    // NEW TODO OBJ
    const newTodo = {
        id: Date.now(),
        todo: inputTodo.value,
        completed: false
    };
    // console.log(newTodo);
    // TODO: SAVE TODO TO LOCAL STORAGE
    // todos.push(newTodo);
    // localStorage.setItem('todos', JSON.stringify(todos));
    saveTodos();
    // APPEND TODO FN
    appendTodo(newTodo);
    // RESET INPUT VALUE
    inputTodo.value = '';
};
// 5 TODOS ARRAY
const todos = JSON.parse(localStorage.getItem('todos') || '[]');
console.log(todos);
// 6 APPEND TODOS TO DOM
window.addEventListener('DOMContentLoaded', () => {
    todos.forEach(todo => appendTodo(todo));
});
// 6 SAVE FN
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};
// 3 APPEND TODO FN
const appendTodo = (newTodo) => {
    // APPEND NEW TODO TO THE DOM
    // Create new LI and Checkbox
    const newLi = document.createElement('li');
    const checkB = document.createElement('input');
    checkB.type = 'checkbox';
    checkB.checked = newTodo.completed;
    // ADD CHECKBOX EVENT LISTENER
    checkB.onchange = () => {
        console.log(checkB.checked);
        newTodo.completed = checkB.checked;
        // SAVE CHANGES TO LOCAL STORAGE
        saveTodos();
    };
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
        deleteTodoItem(newTodo);
    };
    newLi.append(newTodo.todo, checkB, deleteBtn);
    todoList === null || todoList === void 0 ? void 0 : todoList.prepend(newLi);
};
// 7 DELETE ALL TODOS
const clearTodos = () => {
    todos.length = 0;
    saveTodos();
    todoList.innerHTML = '';
};
// Deletes a specific todo item from the list
const deleteTodoItem = (todo) => {
    const index = todos.findIndex(t => t.id === todo.id);
    if (index !== -1) {
        todos.splice(index, 1);
        saveTodos();
        todoList.removeChild(todoList.childNodes[index]);
    }
};
btnDeleteAll.onclick = () => clearTodos();
