// let taskInput= document.querySelector("#taskInput");

// const addBtn = document.querySelector("#addBtn");

// function createTask(taskText) {

//     const li = document.createElement("li");

//     const text = document.createElement("span");
//     text.innerText = taskText;

//     li.appendChild(text);

//     const complete = document.createElement("button");
//     complete.innerText = "Complete";
//     complete.classList.add("complete");

//     complete.addEventListener("click", function() {
//         li.classList.toggle("completed");
//     });

//     const del = document.createElement("button");
//     del.innerText = "Delete";
//     del.classList.add("del");

//     del.addEventListener("click", function() {

//         let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//         tasks = tasks.filter(function(task) {
//             return task !== taskText;
//         });

//         localStorage.setItem("tasks", JSON.stringify(tasks));

//         li.remove();
//     });

//     li.appendChild(complete);
//     li.appendChild(del);


//     const edit = document.createElement("button");
//     edit.innerText = "Edit";
//     edit.classList.add("edit");

//     edit.addEventListener("click", function() {
//         const newText = prompt("Enter new task");
//         let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//         tasks =tasks.map(function(task){
//             if(task === taskText){
//                 return newText;
//             } else{
//                 return task;
//             }
//         });
//         localStorage.setItem("tasks",JSON.stringify(tasks));
//         text.innerText = newText;
//     });

//     li.appendChild(edit);


//     const taskList = document.querySelector("#taskList");
//     taskList.appendChild(li);
// }

// addBtn.addEventListener("click",function(){
//     const taskText = taskInput.value;

//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     tasks.push(taskText);
    
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//     createTask(taskText);
//     taskInput.value="";
// });


// let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
// savedTasks.forEach(function(taskText) {
//     createTask(taskText);
// });







let modebtn = document.querySelector("#modebtn");
let currMode = "light";

modebtn.addEventListener("click", function () {

    if (currMode === "light") {

        currMode = "dark";

        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";

        document.querySelector("#taskInput").style.backgroundColor = "#222";
        document.querySelector("#taskInput").style.color = "white";

        document.querySelectorAll("#taskList li").forEach(function (li) {
            li.style.backgroundColor = "#222";
            li.style.borderColor = "#555";
        });

        modebtn.innerText = "☀️ Light Mode";

    } else {

        currMode = "light";

        document.body.style.backgroundColor = "darkslategrey";
        document.body.style.color = "white";

        document.querySelector("#taskInput").style.backgroundColor = "white";
        document.querySelector("#taskInput").style.color = "black";

        document.querySelectorAll("#taskList li").forEach(function (li) {
            li.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
            li.style.borderColor = "black";
        });

        modebtn.innerText = "🌙 Dark Mode";
    }

    console.log(currMode);
});


let taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");


// CREATE TASK

function createTask(task) {

    const li = document.createElement("li");

    const text = document.createElement("span");
    text.innerText = task.text;

    li.appendChild(text);


    // COMPLETE BUTTON

    const complete = document.createElement("button");
    complete.innerText = "Complete";
    complete.classList.add("complete");

    if (task.completed) {
        li.classList.add("completed");
    }

    complete.addEventListener("click", function () {

        task.completed = !task.completed;

        li.classList.toggle("completed");

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        tasks = tasks.map(function (item) {

            if (item.id === task.id) {
                return task;
            } else {
                return item;
            }

        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    });


    // DELETE BUTTON

    const del = document.createElement("button");
    del.innerText = "Delete";
    del.classList.add("del");

    del.addEventListener("click", function () {

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        tasks = tasks.filter(function (item) {
            return item.id !== task.id;
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));

        li.remove();
    });


    // EDIT BUTTON

    const edit = document.createElement("button");
    edit.innerText = "Edit";
    edit.classList.add("edit");

    edit.addEventListener("click", function () {

        const newText = prompt("Enter new task", task.text);

        if (newText === null || newText.trim() === "") {
            return;
        }

        task.text = newText.trim();

        text.innerText = task.text;

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        tasks = tasks.map(function (item) {

            if (item.id === task.id) {
                return task;
            } else {
                return item;
            }

        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    });


    li.appendChild(complete);
    li.appendChild(del);
    li.appendChild(edit);

    taskList.appendChild(li);


    // If dark mode is already active
    if (currMode === "dark") {
        li.style.backgroundColor = "#222";
        li.style.borderColor = "#555";
    }
}


// ADD TASK

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    createTask(newTask);

    taskInput.value = "";
}


// ADD BUTTON

addBtn.addEventListener("click", function () {
    addTask();
});


// ENTER KEY

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// LOAD SAVED TASKS

let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

savedTasks.forEach(function (task) {
    createTask(task);
});