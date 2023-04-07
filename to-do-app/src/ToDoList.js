import { useEffect, useState } from 'react'
import TodoItem from "@/TodoItem";
import Link from "next/link";

export default function ToDoList({}){
    const [todos, setTodos] = useState([]);
    const [count, setCount] = useState(0);

    const API_ENDPOINT = "https://backend-q6v7.api.codehooks.io/dev/todos/";
    const API_KEY = "a000c16e-5ea8-4400-a25e-8a15f826ccb7";
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
            // update state -- configured earlier.
            todosFromStorage = data;
            //console.log(todosFromStorage[0].task)

            for(let i = 0; i < todosFromStorage.length; i++){
                //console.log("search for "+ (i) + " "+previousComplete[0]);
                if(previousComplete.indexOf(i)!=-1){
                    console.log("set checked to true");
                    todosList.push({"task": todosFromStorage[i].task, "description": todosFromStorage[i].description, "complete": true, "created": todosFromStorage[i].createdOn});
                }
                else if(!todosFromStorage[i].complete){
                    
                    todosList.push({"task": todosFromStorage[i].task, "description": todosFromStorage[i].description, "complete": false, "created": todosFromStorage[i].createdOn});
                }
                else{
                    console.log("somehow complete" + todosFromStorage[i].task);
                }
            }
            setTodos(todosList.sort((a, b)=>{
                if(a.created>b.created){
                    return -1;
                }
                else if (a.createdOn<b.createdOn){
                    return 1;
                }
                return 0;
            }));
            
        }
        fetchData();
        
      }, [count])
      function createTodo(){
        
        const fetchData = async () => {
            const response = await fetch(API_ENDPOINT, {
              'method':'POST',
              'headers': {'x-apikey': API_KEY,'Content-Type': 'application/json'},
              'body':JSON.stringify({"task": "testfromvscode"+count,"description": "ex desc", "complete": false})

            })
            const data = await response.json()
            setCount(count+1)
            //setPosts(data);
            //setLoading(false);
          }
          fetchData();
    }
    return <>
        <h2>TO DO LIST</h2>
 
        {todos.map(todo =>{
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
        <Link href="/done">VIEW COMPLETED TASKS!</Link>

    </>
}
