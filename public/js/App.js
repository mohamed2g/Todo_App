const todoInput = document.querySelector ('.todo-input');
const todoButton = document.querySelector ('.todo-button');
const todoList = document.querySelector ('.todo-list');
const filterOption = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener ('click', addTodo);
todoList.addEventListener ('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

async function addTodo(event){
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todoItem');
    todoDiv.appendChild(newTodo);

    
    saveLocalTodos(todoInput.value);

     
     const completedButton = document.createElement('input');
     completedButton.setAttribute("type", "image");
     completedButton.src="img/icons8-checkmark-26.png"
     completedButton.classList.add("complete-btn");
     todoDiv.appendChild(completedButton);


    
    const trashButton = document.createElement('input');
    trashButton.setAttribute("type", "image");
    trashButton.src= "img/icons8-trash-26.png";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);


   
    todoList.appendChild(todoDiv);
    
    
    


todoInput.value = "";
}

async function deleteCheck(e){
    const item = e.target;
    
    
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;

        
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
    
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = "none";
                }
                break;
                case "uncompleted":
                    if (!todo.classList.contains('completed')){
                        todo.style.display = "flex";
                    }else{
                        todo.style.display = "none";
                    }
                break;
        }
    });
}

async function saveLocalTodos(todo){
    let todos;
    if (sessionStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(sessionStorage.getItem('todos'));
    }

    todos.push(todo);
    sessionStorage.setItem('todos', JSON.stringify(todos));
    let credentials = "Bearer " + sessionStorage.getItem("token");
    
const url = "/addItem";
body= {task:todoInput.value};

const headers = {
    "content-type": "application/json",
    "authorization": credentials
}

const cfg = {
    method: "post",
    body: JSON.stringify(body),
    headers: headers
}

let response = await fetch(url, cfg);

todoInput.value = "";
}

async function getTodos(){
    let todos;
    if (sessionStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(sessionStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
    
        
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todoItem');
        todoDiv.appendChild(newTodo);
    
         
         const completedButton = document.createElement('input');
         completedButton.setAttribute("type", "image");
         completedButton.src="img/icons8-checkmark-26.png"
         completedButton.classList.add("complete-btn");
         todoDiv.appendChild(completedButton);
    
    
        
        const trashButton = document.createElement('input');
        trashButton.setAttribute("type", "image");
        trashButton.src= "img/icons8-trash-26.png";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
    
    
        
        todoList.appendChild(todoDiv);
    });
}

async function removeLocalTodos(todo){
    let todos;
    if (sessionStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(sessionStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    sessionStorage.setItem('todos', JSON.stringify(todos));


    let credentials = "Bearer " + sessionStorage.getItem("token");
    const url = "/deleteItem";
    body= {id:todos.indexOf(todos).value};
    
    const headers = {
        "content-type": "application/json",
        "authorization": credentials
    }

    const cfg = {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: headers
    }

    let response = await fetch(url, cfg);
}

