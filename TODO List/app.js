const form = document.getElementById("newElem");
const input = document.getElementById("input");
const list = document.getElementById("tasks");
const remaining = document.getElementById("remaining");
const clearbutton = document.getElementById("clearAll");
const save = document.getElementById("save");

function retieve(){
  let temp = localStorage.getItem("allTasks")
  if(temp){
    localStorage.clear();
    return temp.split(',');
  }
  else return [];
}

const tab = retieve();

function rerender(){
  let i = 0;
  list.innerHTML = tab.map(
    (value) => `<div class="task">
    <div id="taskName">${value}</div>
    <button id = ${i++}>X</button>
  </div>`
  ).join('');
  remaining.innerHTML = `Remaining: ${tab.length}`;
}

rerender();

form.addEventListener("submit", function(e){
  e.preventDefault();
  if(input.value == "") alert("Input cannot be empty");
  else{
    tab.push(input.value);
    rerender();
    input.value = "";
  }
})

list.addEventListener("click", function(e){
  if(e.target.matches("button")){
    tab.splice(e.target.id, 1);
    rerender();
  }
  if(e.target.matches("div")){
    if(e.target.id == "taskName"){
      e.target.id = "taskNameDone";
    }
    else{
      e.target.id = "taskName";
    }
  }
})

clearbutton.addEventListener("click", function(e){
  tab.length = 0;
  rerender();
})

save.addEventListener("click", function(e){
  localStorage.setItem("allTasks", tab);
})