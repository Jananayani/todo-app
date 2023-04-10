// Select elements
const btnSubmit = document.getElementById("add-btn") as HTMLButtonElement;
const inputTodo = document.getElementById("input") as HTMLInputElement;
const formTodo = document.getElementById("add-list") as HTMLFormElement;
const todoList = document.querySelector(".list") as HTMLUListElement;
const btnDeleteAll = document.getElementById("delete-all") as HTMLButtonElement;

// NewTodo interface
interface NewTodo {
  id: number;
  todo: string;
  completed: boolean;
}

// 1 ADD FORM EVENT LISTENER
formTodo.addEventListener("submit", (e) => handleSubmit(e));

// 2 HANDLE SUBMIT FN
const handleSubmit = (e: Event) => {
  e.preventDefault();
  // NEW TODO OBJ
  const newTodo: NewTodo = {
    id: Date.now(),
    todo: inputTodo.value,
    completed: false,
  };
  // SAVE TODO TO LOCAL STORAGE
  const todos = JSON.parse(localStorage.getItem('todos') || '[]');
  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
  // APPEND TODO FN
  appendTodo(newTodo);
  // RESET INPUT VALUE
  inputTodo.value = "";
};

// 6 APPEND TODOS TO DOM
window.addEventListener("DOMContentLoaded", () => {
  const todos = JSON.parse(localStorage.getItem('todos') || '[]');
  todos.forEach((todo: NewTodo) => appendTodo(todo));
});

// 3 APPEND TODO FN
const appendTodo = (newTodo: NewTodo) => {
  // APPEND NEW TODO TO THE DOM
  // Create new LI and Checkbox
  const newLi = document.createElement("li");
  const checkB = document.createElement("input");
  checkB.type = "checkbox";
  checkB.checked = newTodo.completed;

  // ADD CHECKBOX EVENT LISTENER
  checkB.onchange = () => {
    console.log(checkB.checked);
    newTodo.completed = checkB.checked;
    // SAVE CHANGES TO LOCAL STORAGE
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    const index = todos.findIndex((t: NewTodo) => t.id === newTodo.id);
    todos[index] = newTodo;
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    deleteTodoItem(newTodo);
    todoList.removeChild(newLi);
  };

  newLi.append(newTodo.todo, checkB, deleteBtn);
  todoList?.prepend(newLi);
};



// 7 DELETE ALL TODOS
const clearTodos = () => {
  localStorage.setItem('todos', JSON.stringify([]));
  todoList.innerHTML = "";
};

// Deletes a specific todo item from the list
const deleteTodoItem = (todo: NewTodo) => {
  const todos = JSON.parse(localStorage.getItem('todos') || '[]');
  const index = todos.findIndex((t: NewTodo) => t.id === todo.id);
  if (index !== -1) {
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
  }
};




btnDeleteAll.onclick = () => clearTodos();

