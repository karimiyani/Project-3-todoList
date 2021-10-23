//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todolist");
const filterOption = document.querySelector(".filter-todos");


//event listener
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemove);
filterOption.addEventListener("click", filterTodos);
document.addEventListener("DOMContentLoaded",getLocalTodos);

//function
function addTodo (e){
    e.preventDefault();  
    // const li = document.createElement("li");
    // li.classList.add(todo);
    // li.textContent = todoInput.textContent;
    // document.querySelector(".todo").appendChild(li);
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = `
    <li>${todoInput.value}</li>
    <span><i class="far fa-check-square"></i></span>
    <span><i class="far fa-edit"></i></span>
    <span><i class="far fa-trash-alt"></i></span>`;
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
    saveLocalTodos(todoInput.value);
    todoInput.value = "";
}
function checkRemove(e){
    // console.log(e.target.classList);
    // DOMTokenList(2) ['far', 'fa-check-square', value: 'far fa-check-square']
    // DOMTokenList(2) ['far', 'fa-trash-alt', value: 'far fa-trash-alt']
    // DOMTokenList(2) ['far', 'fa-edit', value: 'far fa-edit']

    // how convert DOMTokenList to Array??
    // const classList =
    const classList = [ ...e.target.classList ];
    // console.log(classList);
    // (2) ['far', 'fa-check-square']
    // (2) ['far', 'fa-edit']
    // (2) ['far', 'fa-trash-alt']
   
    if(classList[1]==="fa-check-square"){
        const todo = e.target.parentElement.parentElement;
        todo.classList.toggle("completed");
    }
    // else if(classList[1]==="fa-edit"){

    // };
    else if(classList[1]==="fa-trash-alt"){
        //we have to remove parent.
        // span is parent but we have to remove div.todo, parent of parent
        // console.log(e.target.parentElement); //span
        // console.log(e.target.parentElement.parentElement); //div.todo
        const todo = e.target.parentElement.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    };
}
function filterTodos(e) {
    //  console.log(e.target.value);
    // All
    // completed
    // uncompleted
    console.log(todoList.childNodes);
    // NodeList [div.todo]
    //2.create array
    const todos = [...todoList.childNodes];
    // console.log(todos);
    // [div.todo, div.todo]  //independ to Number of element
     todos.forEach((todo) => {
         switch (e.target.value) {
             case "all":
                 todo.style.display = "flex";
                 break;
             case "completed":
                 if (todo.classList.contains("completed")) {
                     todo.style.display = "flex" ;
                 }else{
                     todo.style.display = "none" ;
                 }
                 break;
             case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex" ;
                }else{
                    todo.style.display = "none" ;
                }
                break;
         }

     });


}


function saveLocalTodos (todo){
    // localStorage.getItem('todos')
    // localStorage.setItem('todos', JSON.stringify(todos))

    // we want bring todos that user saved
    let savedTodos = localStorage.getItem('todos') ?
    JSON.parse(localStorage.getItem("todos"))
    : [];
    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    // todos	["jmnl"]
    // todos	["jmnl","bkjnk"]
}


//if we refresh page they stay in localStorage but they did not Visible in DOM
//what have to do?
function  getLocalTodos (){
    // we want bring todos that user saved
    let savedTodos = localStorage.getItem('todos') ?
    JSON.parse(localStorage.getItem("todos"))
    : [];
    savedTodos.forEach (todo => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = `
        <li>${todo}</li>
        <span><i class="far fa-check-square"></i></span>
        <span><i class="far fa-edit"></i></span>
        <span><i class="far fa-trash-alt"></i></span>`;
        todoDiv.innerHTML = newTodo;
        todoList.appendChild(todoDiv);

    })

}


function removeLocalTodos (todo){
    console.log(todo.children[0].innerText);
    let savedTodos = localStorage.getItem('todos') ?
    JSON.parse(localStorage.getItem("todos"))
    : [];
    const filterTodos = savedTodos.filter(
        (t) => t!=todo.children[0].innerText
    );
    localStorage.setItem("todos", JSON.stringify(filterTodos));
}