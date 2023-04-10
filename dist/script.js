"use strict";
// Select elements
const btnSubmit = document.getElementById("add-btn");
const inputTodo = document.getElementById("input");
const formTodo = document.getElementById("add-list");
const todoList = document.querySelector(".list");
const taskCounter = document.querySelector(".task-counter");
const completedCounter = document.querySelector(".completed-counter");
// 1 ADD FORM EVENT LISTENER
formTodo.addEventListener("submit", (e) => handleSubmit(e));
// 2 HANDLE SUBMIT FN
const handleSubmit = (e) => {
    e.preventDefault();
    // NEW TODO OBJ
    const newTodo = {
        id: Date.now(),
        todo: inputTodo.value,
        completed: false,
    };
    // SAVE TODO TO LOCAL STORAGE
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
    // APPEND TODO FN
    appendTodoItem(newTodo);
    // RESET INPUT VALUE
    inputTodo.value = "";
    updateCounters(todos);
};
// 6 APPEND TODOS TO DOM
window.addEventListener("DOMContentLoaded", () => {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos.forEach((todo) => appendTodoItem(todo));
});
// 3 APPEND TODO FN
const appendTodoItem = (todo) => {
    // APPEND NEW TODO TO THE DOM
    // Create new LI, Checkbox and Buttons
    const newLi = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.onchange = () => {
        todo.completed = checkbox.checked;
        const todos = JSON.parse(localStorage.getItem('todos') || '[]');
        const index = todos.findIndex((t) => t.id === todo.id);
        todos[index] = todo;
        localStorage.setItem('todos', JSON.stringify(todos));
        updateCounters(todos);
    };
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
        const newTodo = prompt("Enter new todo text:", todo.todo);
        if (newTodo) {
            todo.todo = newTodo;
            const todos = JSON.parse(localStorage.getItem('todos') || '[]');
            const index = todos.findIndex((t) => t.id === todo.id);
            todos[index] = todo;
            localStorage.setItem('todos', JSON.stringify(todos));
            newLi.childNodes[0].textContent = newTodo;
        }
    };
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
        const todos = JSON.parse(localStorage.getItem('todos') || '[]');
        deleteTodoItem(todo);
        todoList.removeChild(newLi);
        updateCounters(todos);
    };
    newLi.append(todo.todo, checkbox, editBtn, deleteBtn);
    todoList === null || todoList === void 0 ? void 0 : todoList.prepend(newLi);
};
const updateCounters = (todos) => {
    const taskCount = todos.length;
    const completedCount = todos.filter((todo) => todo.completed).length;
    taskCounter.textContent = `${taskCount} task${taskCount !== 1 ? 's' : ''}`;
    completedCounter.textContent = `${completedCount} completed`;
};
// Deletes a specific todo item from the list
const deleteTodoItem = (todo) => {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    const index = todos.findIndex((t) => t.id === todo.id);
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
};
