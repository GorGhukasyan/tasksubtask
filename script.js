const inp=document.getElementById("inp"); 
const Btn=document.getElementById("Btn"); 
const taskList=document.getElementById("taskList"); 

let tasks=JSON.parse(localStorage.getItem("tasks"))||[]; 

renderTasks(); 

Btn.addEventListener("click",()=>{ 

const text=inp.value.trim(); 

if(text==="") return; 

const task={ 
id:Date.now(), 
text:text, 
completed:false, 
subtasks:[]
};

tasks.push(task); 

saveTasks(); 

renderTasks();  

inp.value=""; 

});



function saveTasks(){ 

localStorage.setItem("tasks",JSON.stringify(tasks)); 

}

function renderTasks(){ 

taskList.innerHTML="";

tasks.forEach(task=>{ 

const li=document.createElement("li");

if(task.completed){
li.classList.add("completed");
}

const checkbox=document.createElement("input");
checkbox.type="checkbox";
checkbox.checked=task.completed;

checkbox.addEventListener("change",()=>{ 

task.completed=checkbox.checked;

task.subtasks.forEach(sub=>{
sub.completed=task.completed;
});

saveTasks();
renderTasks();

});

const span=document.createElement("span");
span.textContent=task.text;

const deleteBtn=document.createElement("button");
deleteBtn.textContent="Delete";

deleteBtn.addEventListener("click",()=>{

tasks=tasks.filter(t=>t.id!==task.id); 

saveTasks();
renderTasks();

});

const addSubBtn=document.createElement("button"); 
addSubBtn.textContent="Add Subtask";
addSubBtn.addEventListener("click",()=>{

const subText=prompt("Subtask");

if(!subText) return;

task.subtasks.push({
id:Date.now(),
text:subText,
completed:false
});

saveTasks();
renderTasks();

});



li.appendChild(checkbox);
li.appendChild(span);
li.appendChild(addSubBtn);
li.appendChild(deleteBtn);

const subUl=document.createElement("ul");
subUl.classList.add("subtasks");

task.subtasks.forEach(sub=>{

const subLi=document.createElement("li");

if(sub.completed){
subLi.classList.add("completed");
}

const subCheckbox=document.createElement("input");
subCheckbox.type="checkbox";
subCheckbox.checked=sub.completed;

subCheckbox.addEventListener("change",()=>{

sub.completed=subCheckbox.checked;

const allDone=task.subtasks.every(s=>s.completed);

task.completed=allDone;

saveTasks();
renderTasks();

});

const subSpan=document.createElement("span");
subSpan.textContent=sub.text;

const subDelete=document.createElement("button");
subDelete.textContent="Delete";

subDelete.addEventListener("click",()=>{

task.subtasks=task.subtasks.filter(s=>s.id!==sub.id);

saveTasks();
renderTasks();

});

subLi.appendChild(subCheckbox);
subLi.appendChild(subSpan);
subLi.appendChild(subDelete);

subUl.appendChild(subLi);

});

li.appendChild(subUl);

taskList.appendChild(li);

});

}