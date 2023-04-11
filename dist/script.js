"use strict";
// Select elements
const btnSubmit = document.getElementById("add-btn");
const inputTodo = document.getElementById("input");
const formTodo = document.getElementById("add-list");
const todoTable = document.querySelector(".table");
const taskCounter = document.querySelector(".task-counter");
const completedCounter = document.querySelector(".completed-counter");
// Add Form Event Listner
formTodo.addEventListener("submit", (event) => handleSubmit(event));
// Submit Function
const handleSubmit = (event) => {
    // event.preventDefault();
    // New object of todo
    const newTodo = {
        id: Date.now(),
        todo: inputTodo.value,
        completed: false,
    };
    // Save todo to local storage
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
    appendTodoItem(newTodo);
    // Reset the value of text box
    inputTodo.value = "";
    //get count of tasks
    updateCounters(todos);
};
// Append todos to DOM
window.addEventListener("DOMContentLoaded", () => {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos.forEach((todo) => appendTodoItem(todo));
    updateCounters(todos);
});
const appendTodoItem = (todonext) => {
    // Create new row
    const newRow = todoTable.insertRow(-1);
    newRow.id = `row-${todonext.id}`;
    // Create checkbox cell
    const checkboxCell = newRow.insertCell(0);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todonext.completed;
    checkboxCell.appendChild(checkbox);
    checkbox.onchange = () => {
        todonext.completed = checkbox.checked;
        const todos = JSON.parse(localStorage.getItem('todos') || '[]');
        const index = todos.findIndex((t) => t.id === todonext.id);
        todos[index] = todonext;
        localStorage.setItem('todos', JSON.stringify(todos));
        //Get count of filled checkboxes
        updateCounters(todos);
    };
    // Create task cell
    const taskCell = newRow.insertCell(0);
    taskCell.textContent = todonext.todo;
    // Create edit button cell
    const editBtnCell = newRow.insertCell(2);
    const editBtn = document.createElement("button");
    editBtn.type = "edit";
    editBtn.textContent = "Edit";
    editBtn.className = "btn btn-primary edit-btn";
    editBtnCell.appendChild(editBtn);
    editBtn.onclick = () => {
        const newTodo = prompt("Enter new todo text:", todonext.todo);
        if (newTodo) {
            todonext.todo = newTodo;
            const todos = JSON.parse(localStorage.getItem('todos') || '[]');
            const index = todos.findIndex((t) => t.id === todonext.id);
            todos[index] = todonext;
            localStorage.setItem('todos', JSON.stringify(todos));
            taskCell.textContent = newTodo;
        }
    };
    // Create delete button cell
    const deleteBtnCell = newRow.insertCell(3);
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "btn btn-danger dlt-btn";
    deleteBtnCell.appendChild(deleteBtn);
    deleteBtn.onclick = () => {
        const todos = JSON.parse(localStorage.getItem('todos') || '[]');
        const index = todos.findIndex((t) => t.id === todonext.id);
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        todoTable.deleteRow(newRow.rowIndex);
        //Get count of tasks
        updateCounters(todos);
    };
};
//Function to update count
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
