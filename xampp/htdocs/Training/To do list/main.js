// Setting Up Variables
let theInput = document.querySelector(".addt input");
let theAddButton = document.querySelector(".addt .plus");
let deleteAllButton = document.querySelector(".delete-all");
let tasksContainer = document.querySelector(".item");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");
const MAX_TASKS = 10;

// Focus On Input Field
window.onload = function () {
  theInput.focus();
};

// Adding The Task
theAddButton.onclick = function () {

  // Check if the number of tasks is less than  11
  if (document.querySelectorAll('.item .task-box').length >= MAX_TASKS) {
    alert("You can only add up to 10 tasks ,Please remove some tasks!!");
    return;
  }

  // If Input is Empty...
  if (theInput.value === '') {

    console.log("No Value");

  } else {

    // just up to 100 characters
    let taskText = theInput.value.slice(0, 100);

    let noTasksMsg = document.querySelector(".no-task");

    // Check If Span With No Tasks 
    if (document.body.contains(document.querySelector(".no-task"))) {

      noTasksMsg.remove();

    }

    let mainDiv = document.createElement("div");

    // Create Checkboxand Label Element
    let newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.name = 'task';
    newCheckbox.value = taskText;

  
    let label = document.createElement('label');
    label.htmlFor = newCheckbox.name;
    label.appendChild(document.createTextNode(taskText));

    // Create Delete Button
    let deleteElement = document.createElement("span");
    let deleteText = document.createTextNode("X");
    deleteElement.appendChild(deleteText);
    deleteElement.className = 'delete';
    deleteElement.style.display = 'none'; 

    // Add Checkbox and Labeland Delete Button  to Main Div
    mainDiv.appendChild(newCheckbox);
    mainDiv.appendChild(label);

    mainDiv.appendChild(deleteElement);

    // Add Class To Main Div
    mainDiv.className = 'task-box';

    // Add The Task To The Container
    tasksContainer.prepend(mainDiv);

    theInput.value = '';

   
    theInput.focus();

    // Add event listener to toggle the delete button visibility based on checkbox state
    newCheckbox.addEventListener('change', function() {
      if (newCheckbox.checked) {
        deleteElement.style.display = 'inline';
      } else {
        deleteElement.style.display = 'none';
      }
    });

    calculateTasks();

  }

};

document.addEventListener('click', function (e) {

  // Delete Task
  if (e.target.className == 'delete') {

    // Remove  Task
    e.target.parentNode.remove();

    // Check Number Of Tasks Inside The Container
    if (tasksContainer.childElementCount == 0) {

      createNoTasks();

    }

    calculateTasks();
  }

  // Finish Task
  if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {

  
    e.target.parentNode.classList.toggle("finished");

    // Toggle the delete button visibility
    let deleteElement = e.target.parentNode.querySelector('.delete');
    if (e.target.checked) {
      deleteElement.style.display = 'inline';
    } else {
      deleteElement.style.display = 'none';
    }
  }

  calculateTasks();

});

// Function To Create No Tasks Message
function createNoTasks() {

  let msgSpan = document.createElement("span");

  let msgText = document.createTextNode("No Tasks To Show");

  // Add Text To Message and Class Span Element
  msgSpan.appendChild(msgText);

 
  msgSpan.className = 'no-task';

  // Append The Message Span Element To The Task Container
  tasksContainer.appendChild(msgSpan);

}

// Function To Calculate Tasks
function calculateTasks() {

  tasksCount.innerHTML = document.querySelectorAll('.item .task-box').length;

  tasksCompleted.innerHTML = document.querySelectorAll('.item .finished').length;

}
 ////////// Remove all checked tasks
deleteAllButton.onclick = function () {


  let tasks = document.querySelectorAll('.item .task-box');
  tasks.forEach(function(task) {
    let checkbox = task.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      task.remove();
    }
  });

  // Check if there are no tasks 
  if (tasksContainer.childElementCount == 0) {
    createNoTasks();
  }

  calculateTasks();
};