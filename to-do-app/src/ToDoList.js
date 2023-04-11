import { useEffect, useState } from 'react'
import TodoItem from "@/TodoItem";
import Link from "next/link";
import { useRouter } from 'next/router'

export default function ToDoList({}){
    const [todos, setTodos] = useState([]);
    const [count, setCount] = useState(0);

    const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    function completeTask(created){
        let copy = [];
        let i;
        for(i = 0; i < todos.length; i++){
            if(todos[i].created === created){
                console.log(todos[i].task + " found and setto  " +!todos[i].complete);
                copy[i] = todos[i];
                copy[i].complete = !copy[i].complete;
               
            }
            else{
                copy.push(todos[i]);
            }
        }
        
        setTodos(copy);

    }
    useEffect(() => {
        let todosFromStorage = []
        let todosList = []
        let previousComplete=[];
        if(count != 0){
            let i;
            for(i = 0; i < todos.length; i++){
                if(todos[i].complete){
                    console.log("found a checked "+ (i+1));
                    previousComplete.push(i+1);

                }
            }
        }   
        const fetchData = async () => {
            const response = await fetch(API_ENDPOINT, {
              'method':'GET',
              'headers': {'x-apikey': API_KEY}
            })
            const data = await response.json()
            todosFromStorage = data;
            todosFromStorage = todosFromStorage.reverse()
            function func(item){
                console.log("item filters " + item.complete)
                return !item.complete;
            }
            console.log("LENGTH "+  + " "+todosFromStorage.length);
            todosFromStorage =todosFromStorage.filter(func);
            console.log("LENGTH After "+todosFromStorage.length);

            for(let i = 0; i < todosFromStorage.length; i++){
                console.log("search for "+ (i) + " "+todosFromStorage[i].task);
                if(previousComplete.indexOf(i)!=-1){
                    //console.log("set checked to true for" + todosFromStorage[i].task);
                    todosList.push({"task": todosFromStorage[i].task, "description": todosFromStorage[i].description, "complete": true, "created": todosFromStorage[i].createdOn, "id":todosFromStorage[i]._id});
                }
                else if(!todosFromStorage[i].complete){
                    todosList.push({"task": todosFromStorage[i].task, "description": todosFromStorage[i].description, "complete": false, "created": todosFromStorage[i].createdOn, "id":todosFromStorage[i]._id});
                }
                else{
                    console.log("somehow complete" + todosFromStorage[i].task);
                }
            }
            setTodos(todosList.sort((a, b)=>{
                // if(a.created==undefined){
                //     console.log("und" + a.task);
                // }
                // else if (b.created == undefined){
                //     console.log("und"+b.task);
                // }
                //console.log(a.created +"  " + b.created);
                if(a.created>b.created){
                    //console.log(a.task +" > " + b.task);
                    return -1;
                }
                else if (a.created<b.created){
                    //console.log(a.task + " < " + b.task);
                    return 1;
                }
                return 0;
            }));
            
            setLoading(false);
            
        }
        fetchData();
        
      }, [count])
      if(loading == true){
        return <>
            <div>HI There. Loading your ToDo List</div>
        </>
      }
      function createTodo(){
        
        const fetchData = async () => {
            const response = await fetch(API_ENDPOINT, {
              'method':'POST',
              'headers': {'x-apikey': API_KEY,'Content-Type': 'application/json'},
              'body':JSON.stringify({"task": "Task "+count,"description": "ex desc", "complete": false})

            })
            const data = await response.json()
            setCount(count+1)
            //setPosts(data);
            //setLoading(false);
          }
          fetchData();
    }
    function saveCompleteTasks(){

        for(let i = 0; i < todos.length; i++){
            if(todos[i].complete){
                //console.log("updting "+ todos[i].task)
                const fetchData = async () => {
                    let update = API_ENDPOINT+todos[i].id;
                    const response = await fetch(update, {
                      'method':'PATCH',
                      'headers': {'x-apikey': API_KEY,'Content-Type': 'application/json'},
                      'body':JSON.stringify({"task": todos[i].task,"description": todos[i].description, "complete": true})
        
                    })
                    const data = await response.json()
                    //setPosts(data);
                    //setLoading(false);
                  }
                  fetchData();
            }
        }
        
    }
    return <>
        <h2>TO DO LIST</h2>
 
        {todos.map(todo =>{
            console.log("length " + todos.length)
            if(todo.complete){
                return <TodoItem complete={true} task={todo.task} date={todo.created} onTodoClick = {completeTask}></TodoItem>
            }
             //return <TodoItem num={todo.num} complete={todo.complete} task={todo.task} date={todo.created} ></TodoItem>
             
             return <TodoItem complete={false} task={todo.task} date={todo.created} onTodoClick = {completeTask}></TodoItem>
        })}
        <h3>Add New Task</h3>
        <input type="text"></input>
        <button onClick={createTodo}>ADD TASK</button>
        <br></br>
        <div onClick={saveCompleteTasks}>VIEW COMPLETED TASKS</div>
        <br></br>
        <Link href="/done" onClick={saveCompleteTasks}>VIEW COMPLETED TASKS!</Link>

    </>
}
