//localStorage.clear();

var addButton = document.getElementsByClassName('btn-success')[0];
var addedText = document.getElementById("inputText");

//check inputform for empty string:
addedText.addEventListener("input", checkForm);

function checkForm() {
    if (addedText.value !== "") {
        addButton.disabled = false;
    } else { addButton.disabled = true; }
}

//load saved TODO List:
loadTasklist();

function loadTasklist() {
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        addTaskToDOM(key, value);
    }
}

//function to add task from localStorage to DOM:
function addTaskToDOM(key, value) {
    var ol = document.getElementById("taskList");
    var taskLine = document.createElement("li");
    taskLine.innerHTML = value;
    var removeSignInner = document.createElement("span");
    removeSignInner.setAttribute("aria-hidden", "false");
    removeSignInner.classList.add("glyphicon", "glyphicon-remove", "form-control-feedback");
    taskLine.appendChild(removeSignInner);
    taskLine.setAttribute("id", key);
    ol.appendChild(taskLine);
}

//add new task in TODO List:
addButton.addEventListener("click", submitFunc);

function submitFunc(e) {
    e.preventDefault();
    var currentTask = addedText.value;
    var taskLine = document.createElement("li");
    taskLine.innerHTML = currentTask;
    var removeSignInner = document.createElement("span");
    removeSignInner.setAttribute("aria-hidden", "false");
    removeSignInner.classList.add("glyphicon", "glyphicon-remove", "form-control-feedback");
    taskLine.appendChild(removeSignInner);

    //create #id for each task:
    var currentDate = new Date();
    var key = currentDate.getTime();
    taskLine.setAttribute("id", key);

    //add each task to <ol> in DOM:
    var listOfTasks = document.getElementById("taskList");
    listOfTasks.appendChild(taskLine);

    //add each task to the localStorage:
    localStorage.setItem(key, currentTask);

    //reset string in inputform:
    document.getElementById("inputText").value = "";
    addButton.disabled = true;
}

//remove task:
document.getElementById("taskList").addEventListener("click", function(e) {
    var targetSign = e.target;
    if (targetSign.tagName === "SPAN") {
        var key = targetSign.parentNode.id;
        localStorage.removeItem(key);
        targetSign.parentNode.remove();
        e.stopPropagation();
    };
}, true);

//open modal window to change task
var changedList;
document.getElementById("taskList").addEventListener("click", function(e) {
    e.target.classList.add("listToChange");
    document.getElementById("changedText").value = e.target.innerText;
    $("#myModal").modal('show');
});

//check form in modal window for empty string
var changedTask;
document.getElementById("changedText").addEventListener('input', function(e) {
    changedTask = e.target.value;
    if (changedTask === "") {
        document.getElementById("btn-change").disabled = true;
    } else { document.getElementById("btn-change").disabled = false; }
})

// save changes in task:
var changeButton = document.getElementById("btn-change");
changeButton.addEventListener("click", function(e) {
    document.getElementsByClassName('listToChange')[0].innerHTML = changedTask;
    var key = document.getElementsByClassName('listToChange')[0].id;
    var removeSignInner = document.createElement("span");
    removeSignInner.setAttribute("aria-hidden", "false");
    removeSignInner.classList.add("glyphicon", "glyphicon-remove", "form-control-feedback");
    document.getElementsByClassName('listToChange')[0].appendChild(removeSignInner);
    document.getElementsByClassName('listToChange')[0].classList.remove('listToChange');
    //rewrite changes in the localStorage:
    localStorage.setItem(key, changedTask);
})
