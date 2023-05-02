"use strict";
// Select elements
const taskName = document.querySelector(".input");
const taskList = document.querySelector(".add-list");
const taskTable = document.querySelector(".table");
const taskCounter = document.querySelector(".task-counter");
const completedCounter = document.querySelector(".completed-counter");
let todos = [];
// Add Form Event Listener
taskList.addEventListener("submit", (event) => handleSubmit(event));
// Submit Function
const handleSubmit = (event) => {
    event.preventDefault();
    const todoName = taskName.value.trim();
    if (!todoName) {
        return;
    }
    const existingTodo = todos.find((todo) => todo.todo.toLowerCase() === todoName.toLowerCase());
    if (existingTodo) {
        alert(`Todo item "${existingTodo.todo}" already exists. Please add another name`);
        return;
    }
    // New object of todo
    const newTodo = {
        id: Date.now(),
        todo: taskName.value,
        completed: false,
    };
    todos.push(newTodo);
    appendTask(newTodo);
    // Reset the value of text box
    taskName.value = "";
    //get count of tasks
    updateCounters(todos);
};
const appendTask = (todo) => {
    // Create new row
    const newRow = taskTable.insertRow(-1);
    // newRow.id = `row-${todo.id}`;
    // Create task cell
    const taskCell = newRow.insertCell(0);
    taskCell.textContent = todo.todo;
    // Create checkbox cell
    const checkboxCell = newRow.insertCell(1);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkboxCell.appendChild(checkbox);
    checkbox.onchange = () => {
        todo.completed = checkbox.checked;
        //Get count of filled checkboxes
        updateCounters(todos);
    };
    // Create edit button cell
    const editBtnCell = newRow.insertCell(2);
    const editBtn = document.createElement("button");
    editBtn.type = "edit";
    editBtn.textContent = "Edit";
    editBtn.className = "btn btn-primary edit-btn";
    editBtnCell.appendChild(editBtn);
    editBtn.onclick = () => {
        const newTodo = prompt("Enter new todo text:", todo.todo);
        if (newTodo) {
            todo.todo = newTodo;
            taskCell.textContent = newTodo;
            //Get count of tasks
            updateCounters(todos);
        }
    };
    // Create delete button cell
    const deleteBtnCell = newRow.insertCell(3);
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "btn btn-danger dlt-btn";
    deleteBtnCell.appendChild(deleteBtn);
    deleteBtn.onclick = () => {
        const confirmDelete = confirm("Are you sure you want to delete this todo?");
        if (confirmDelete) {
            const index = todos.findIndex((t) => t.id === todo.id);
            todos.splice(index, 1);
            taskTable.deleteRow(newRow.rowIndex);
            //Get count of tasks
            updateCounters(todos);
        }
    };
};
//Function to update count
const updateCounters = (todos) => {
    const taskCount = todos.length;
    // const todos1 = "abc";
    const completedCount = todos === null || todos === void 0 ? void 0 : todos.filter((todo) => todo.completed).length;
    taskCounter.textContent = `${taskCount}  Task${taskCount !== 1 ? "s" : ""}`;
    completedCounter.textContent = `${completedCount} Completed`;
};
