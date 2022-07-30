// selectors
const todo_input = document.querySelector(".todo-input");
const todo_button = document.querySelector(".todo-button");
const todo_list = document.querySelector(".todo-list");
const filter_option=document.querySelector('.filter-todo');

// event listener
document.addEventListener('DOMContentLoaded',getTodos)
todo_button.addEventListener("click", addTodo);
todo_list.addEventListener("click", delete_todo);
filter_option.addEventListener('click',filterTodo)

// function
function addTodo(event) {
  // prevent form from submitting
  event.preventDefault();
  if (todo_input.value === "") {
    return;
  }
  // todo div
  const todo_div = document.createElement("div");
  todo_div.classList.add("todo");
  // create li
  const new_todo = document.createElement("li");
  new_todo.innerText = todo_input.value;
  new_todo.classList.add("todo-item");
  todo_div.appendChild(new_todo);
  // add todo to local storage
  saveLocalTodos(todo_input.value);
  // complete buttons
  const complete_button = document.createElement("button");
  complete_button.innerHTML = '<i class="fa-solid fa-check"></i>';
  complete_button.classList.add("complete-button");
  todo_div.appendChild(complete_button);
  // check button
  const delete_button = document.createElement("button");
  delete_button.innerHTML = '<i class="fa-solid fa-trash"></i>';
  delete_button.classList.add("delete-button");
  todo_div.appendChild(delete_button);

  todo_list.appendChild(todo_div);
//   console.log(todo_div);
  todo_input.value = "";
}

function delete_todo(e) {
  const item = e.target;
  // delete todo
  if (item.classList[0] === "delete-button") {
    const todo = item.parentElement;
    // animation
    todo.classList.add("fall");
    removeLocalTodos(todo)
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-button") {
    const todo = item.parentElement;
    todo.classList.toggle("crossed");
  }
}

function filterTodo(e){
    const todos=todo_list.childNodes; // grab all the existing todos
    const target=e.target.value;
    for(let i=1;i<todos.length;i++){
       if(target==='all'){
        todos[i].style.display='flex';
       }
       else if(target==='completed'){
        if(todos[i].classList.contains('crossed')){
            todos[i].style.display='flex';
        }
        else{
            todos[i].style.display='none';
        }
       }
       else if(target==='pending'){
        if(!todos[i].classList.contains('crossed')){
            todos[i].style.display='flex';
        }
        else{
            todos[i].style.display='none';
        }
       }
    }

}

function saveLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos')===null){
    todos=[];
  }else{
    todos=JSON.parse(localStorage.getItem('todos'));

  }
  todos.push(todo);
  localStorage.setItem('todos',JSON.stringify(todos))
}

function getTodos(){
  let todos;
  if(localStorage.getItem('todos')===null){
    todos=[];
  }else{
    todos=JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo){
    // todo div
  const todo_div = document.createElement("div");
  todo_div.classList.add("todo");
  // create li
  const new_todo = document.createElement("li");
  new_todo.innerText = todo ;
  new_todo.classList.add("todo-item");
  todo_div.appendChild(new_todo);
  // complete buttons
  const complete_button = document.createElement("button");
  complete_button.innerHTML = '<i class="fa-solid fa-check"></i>';
  complete_button.classList.add("complete-button");
  todo_div.appendChild(complete_button);
  // check button
  const delete_button = document.createElement("button");
  delete_button.innerHTML = '<i class="fa-solid fa-trash"></i>';
  delete_button.classList.add("delete-button");
  todo_div.appendChild(delete_button);

  todo_list.appendChild(todo_div);
  });

}

function removeLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos')===null){
    todos=[];
  }else{
    todos=JSON.parse(localStorage.getItem('todos'));
  }
  const text=todo.children[0].innerText;
  const todo_index=todos.indexOf(text);
  todos.splice(todo_index,1);
  localStorage.setItem('todos',JSON.stringify(todos))

}