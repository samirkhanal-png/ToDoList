const taskField=document.querySelector("#TaskField")
const addButton=document.querySelector("#addTask")

const taskContainer=document.querySelector("#task-container")


//For storing all the items inside storage
let taskArray=[] //after every refresh taskArray was being empty due to this so the localStorage becomes empty after setting the first item in taskArray previous one gets lost 

//Populating tasks from the previous session
window.onload = () => {
  taskArray = getFromLocalStorage();
  taskArray.forEach((task) => {
    createUi(task);
  });
};

function createObj(userInput){
  return {
    id:Date.now(), //unique id
    task:userInput,
    completed:false 
  }
}

function saveToLocalStorage(arr){
  localStorage.setItem('task',JSON.stringify(arr))
}

function getFromLocalStorage(){
    let arr
    let task=localStorage.getItem('task')
    if(task){
      arr=JSON.parse(task)
    }
    else{
      arr=[]
    }
    return arr
}

function createUi(obj){
  let li=document.createElement("li")
  li.style.width=100+"%"
  li.style.display="flex"
  li.style.flexWrap="Wrap"
  li.style.justifyContent="space-between"
  li.style.gap=5+"px"
  li.style.marginTop=5+"px"
  li.setAttribute("id",obj.id) //helps in deleting bro

  let checkbox=document.createElement("input")
  checkbox.setAttribute("type","checkbox")
  checkbox.style.cursor="pointer"

  

  li.innerText=obj.task
  let deleteBtn=document.createElement("button")
  deleteBtn.style.cursor="pointer"
  deleteBtn.innerText="X"

  li.appendChild(checkbox)
  li.appendChild(deleteBtn)
  taskContainer.appendChild(li)


  deleteBtn.addEventListener("click", (e) => {

  //Deleting in the local storage
   let ind
   let arr=getFromLocalStorage()
   arr.forEach((value,index)=>{
    if(value.id==e.target.parentElement.id){
      ind=index
    }
   })
   arr.splice(ind,1)
   saveToLocalStorage(arr)


    let liElement = e.target.parentElement;
    console.log(liElement)
    //remove list child from the parent container
    taskContainer.removeChild(liElement); 
  });
  
  checkbox.addEventListener("click",()=>{
   //initialize the previous checkbox
  if(checkbox.checked){
    console.table(li.firstChild)
    li.style.textDecoration="line-through"

    let taskArr=getFromLocalStorage()
    taskArr.forEach((value)=>{
      if(value.id==obj.id){
        value.completed=true
      }
    })
    saveToLocalStorage(taskArr)
  }
  else{
    li.style.textDecoration="none"
    let taskArr=getFromLocalStorage()
    taskArr.forEach((value)=>{
      if(value.id==obj.id){
        value.completed=false
      }
    })
    saveToLocalStorage(taskArr)
  }
  })
  
}


addButton.addEventListener("click",()=>{

  let userInput=taskField.value
  if(userInput){
  let taskObj=createObj(userInput)
  taskArray.push(taskObj)
  saveToLocalStorage(taskArray)
  createUi(taskObj)
  }
  
  //Clearing the input field 
  taskField.value=""
})



