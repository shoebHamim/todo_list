// selectors

const todo_input=document.querySelector('.todo-input');
const todo_button=document.querySelector('.todo-button');
const todo_list=document.querySelector('.todo-list');

// event listener

todo_button.addEventListener('click',addTodo);
todo_list.addEventListener('click',delete_todo);
// function

function addTodo(event){
    // prevent form from submitting
    event.preventDefault();
    if(todo_input.value===''){
        return
    }
    // todo div
    const todo_div=document.createElement('div');
    todo_div.classList.add('todo');
    // create li
    const new_todo=document.createElement('li');
    new_todo.innerText=todo_input.value;
    new_todo.classList.add('todo-item')
    todo_div.appendChild(new_todo);
    // complete buttons
    const complete_button=document.createElement('button')
    complete_button.innerHTML='<i class="fa-solid fa-check"></i>'
    complete_button.classList.add('complete-button');
    todo_div.appendChild(complete_button);
    // check button
    const delete_button=document.createElement('button')
    delete_button.innerHTML='<i class="fa-solid fa-trash"></i>'
    delete_button.classList.add('delete-button');
    todo_div.appendChild(delete_button);

    todo_list.appendChild(todo_div);
    console.log(todo_div);
    todo_input.value='';

}

function delete_todo(e){
    console.log(e.target);
}