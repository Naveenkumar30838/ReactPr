import { useState } from 'react'
import './DoList.css'
import { v4 as uuidv4 } from 'uuid';
import {getTime} from './utilFunc'
export default function (){


    
    let [todos , setTodos] = useState([{
        task : "Sample Task ", 
        key : uuidv4(),
        At:getTime(),
        isDone : false,
    }]);
    let [newTodo , setnewTodo] = useState("")

    function verify(str){
        for(let i=0;i<str.length;i++){
            if(str.charAt(i)!=" "){return true;}
        }
        return false;
    }
    
    // to update the newTodo
    function updateNewTodo(e) {
        setnewTodo(()=>(e.target.value));
    }
    // add new Todo to the todos list
    function addNewTodo(e){
        if(verify(newTodo) && !isTaskPresent(newTodo)){
            setTodos([...todos ,  {
                task : newTodo, 
                key : uuidv4(),
                At: getTime(),
                isDone : false,
            }]);
            setnewTodo("")
        }else{
            window.alert("Either Task Already Present or Invalid Value")
        }
    }
    // delete one Task 
    function deleteOne(id){
        setTodos((prevTodos)=>{
            return prevTodos.filter((todo)=>{
                if(!(todo.key===id)){
                    return todo;
                }
            })
        })
    }
    const upperCaseOne = (id)=>{
            setTodos((prevTodos)=>{
                 return prevTodos.filter((todo)=>{
                    if((todo.key===id)){
                        todo.task=todo.task.toUpperCase();
                    }
                    return todo;
                })
            }
        )
    }
    const clearAll = ()=>{
        setTodos((prevTodos)=>{
            return prevTodos.slice(0,0);
        });
    }
    const toUpperCaseAll = ()=>{
        setTodos((prevTodos)=>(
             prevTodos.map((todo)=>{
                return {...todo , task:todo.task.toUpperCase()}
            })
        ))
    }
    // To check Whether the task is already present or not
    function isTaskPresent(task){
        let MatchFound = false;
        const forEachOutput= todos.forEach((todo , i )=>{
            if(todo.task.toLowerCase()==task.toLowerCase()){
                MatchFound=true;
                return true;
            }
        });
        return MatchFound;
    }

    //To Swap current index element with element just above that element 
    function oneUp(idx){
        if(idx==0){return ;}
        const temp = todos[idx];
        todos[idx]=todos[idx-1];
        todos[idx-1]=temp;
        setTodos([...todos])
    }
    function oneDown(idx){
        if(idx==todos.length-1){return ;}
        console.log(todos);
        const temp = todos[idx];
        todos[idx]=todos[idx+1];
        todos[idx+1]=temp;
        console.log(todos)
        setTodos([...todos])
    }
    // to change the IsDone Function 
    function setIsDone( key){
        setTodos((prevTodos)=>{
            return prevTodos.map((todo)=>{
                if(todo.key==key){
                    return {...todo , isDone:!todo.isDone}
                }else{
                    return todo;
                }
                
            })
        })
    }
    return (<>
      <div className="container">
         
        <div className="work-form">
           
                <input type="text" placeholder="Enter a Task" onChange={updateNewTodo} value={newTodo}/>
                <button onClick={addNewTodo}>Add To List</button>
                
        </div>

        <div className="workList">

            {/* Header */}
            <div className="list-header">
                <p>ListNames</p>
                <div className='list-header-btn' >
                    <button onClick={clearAll}>Delete All</button>
                    <button onClick={toUpperCaseAll}>UpperCase All</button>
                </div>
            </div>

            {/* Actual List */}
            <ul>
                {todos.map((todo , idx)=>{
                  return (
                  <li key={todo.key } className='list-item'>
                         <p >{todo.task}</p>
                        <div>
                            <div className='task-fnc'><i class="fa-solid fa-angles-up" onClick={()=>{oneUp(idx)}}></i></div>
                            <div className='task-fnc'><i class="fa-solid fa-angles-down" onClick={()=>{oneDown(idx)}}></i></div>
                            <div className='task-fnc'>Priority {idx+1}</div>
                            <div className='task-fnc' >AT :{todo.At} </div>
                            <div className='task-fnc' onClick={()=>{setIsDone(todo.key)}}>isDone : {String(todo.isDone)} </div>
                            <div className='task-fnc' onClick={()=>{deleteOne(todo.key)}}>Delete</div>
                            <div className='task-fnc' onClick={()=>upperCaseOne(todo.key)}>UpperCase</div>
                        </div>
                   </li>
                  )
                })}
            </ul>

        </div>

      </div>
        
    </>)
}