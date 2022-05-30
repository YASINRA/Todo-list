const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todolist");
const filterOption = document.querySelector(".filter-todos");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemove);
filterOption.addEventListener("click", filterTodos);
document.addEventListener('DOMContentLoaded', getLocalTodos);

function addTodo(event) {
    event.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = `<li>${todoInput.value}</li>
<span><i class="far fa-check-square fa"></i></span>
<span><i class="fa fa-trash fa" aria-hidden="true"></i></span>`;
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
    saveLocalTodos(todoInput.value);
    todoInput.value = "";
}

function checkRemove(event) {
    const classList = [...event.target.classList];
    const item = event.target;
    if (classList[1] === "fa-check-square") {
        const todo = item.parentElement.parentElement;
        todo.classList.toggle("completed");
    } else if (classList[1] === "fa-trash") {
        const todo = item.parentElement.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }
}

function filterTodos(event) {
    const todos = [...todoList.childNodes];
    todos.forEach((todo) => {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let saveTodos = localStorage.getItem("todos") ?
        JSON.parse(localStorage.getItem("todos")) : [];
    saveTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(saveTodos));
}

function getLocalTodos() {
    let saveTodos = localStorage.getItem("todos") ?
        JSON.parse(localStorage.getItem("todos")) : [];
    saveTodos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo = `<li>${todo}</li>
    <span><i class="far fa-check-square fa"></i></span>
    <span><i class="fa fa-trash fa" aria-hidden="true"></i></span>`;
        todoDiv.innerHTML = newTodo;
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let saveTodos = localStorage.getItem("todos") ?
        JSON.parse(localStorage.getItem("todos")) : [];
    const filteredTodos = saveTodos.filter(t => t !== todo.children[0].innerText);
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
}