import { Patrick_Hand_SC } from "next/font/google";
import Link from "next/link";
import { useAuth , UserButton} from '@clerk/nextjs';
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from "react";
import TodoItem from "@/TodoItem";


export default function categoryTodos({oneTodo}) {
    const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const todoTask = useRef();
    const router = useRouter()
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [todos, setTodos] = useState([])
    
    

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
        const fetchData = async () => {
        const response = await fetch(API_ENDPOINT, {
                     'method':'GET',
                    'headers': {'x-apikey': API_KEY}
        })
        const data = await response.json()
        
        todosFromStorage = data;
        todosFromStorage = todosFromStorage.reverse()
        //console.log(todosFromStorage + "   "+value)
        function func(item){
            console.log("what the heckt "+ router.asPath)
            return item.category ==router.asPath;
        }
                //console.log("LENGTH "+  + " "+todosFromStorage.length);
        todosFromStorage =todosFromStorage.filter(func);
        for(let i = 0; i < todosFromStorage.length; i++){
            todosList.push({"task": todosFromStorage[i].task, "description": todosFromStorage[i].description, "category": todosFromStorage[i].category,"complete": false, "created": todosFromStorage[i].createdOn, "id":todosFromStorage[i]._id});

        }
        console.log(todosFromStorage)
        setTodos(todosList)
        }
        fetchData();
    },[]);

    function createTodo(){
        if(todoTask.current.value == ""){
            return;
        }
        let task = todoTask.current.value;
        
        const fetchData = async () => {
            const token = await  getToken({template: 'codehooks'});
            const response = await fetch(API_ENDPOINT, {
              'method':'POST',
               headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
                },
              'body':JSON.stringify({"task": task,"description": token,"category": router.asPath.split("/")[2], "complete": false})

            })
            const data = await response.json()
           
            todoTask.current.value =""
          }
          fetchData();
    }
    function saveCompleteTasks(){

        for(let i = 0; i < todos.length; i++){
            if(todos[i].complete){
                //console.log("updting "+ todos[i].task)
                const fetchData = async () => {
                    let update = API_ENDPOINT+todos[i].id;
                    const token = await getToken({template: 'codehooks'});
                    const response = await fetch(update, {
                      'method':'PATCH',
                    //   'headers': {'x-apikey': API_KEY,'Content-Type': 'application/json'},
                       headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                       },
                      'body':JSON.stringify({"task": todos[i].task,"description": todos[i].description, "complete": true})
        
                    })
                    const data = await response.json()
                    
                  }
                  fetchData();
            }
        }
        
    }
    return (
    <div className="background">
     <div className="bar">
        <h2 id="top">TO DO LIST</h2>
        <UserButton></UserButton>
    </div>
    
    {todos.map(todo =>{
        console.log("length " + todos.length)
        if(todo.complete){
            return <TodoItem complete={true} task={todo.task} desc={todo.description} date={todo.created} onTodoClick = {completeTask}></TodoItem>
        }
        //return <TodoItem num={todo.num} complete={todo.complete} task={todo.task} date={todo.created} ></TodoItem>
        
        return <TodoItem complete={false} task={todo.task} desc={todo.description} date={todo.created} onTodoClick = {completeTask}></TodoItem>
    })};
    <h3>Add New Task</h3>
        <label for="taskinput">Task:</label>
        <input ref={todoTask} type="text" id="taskinput" required></input>
        <button onClick={createTodo} onSubmit={createTodo}>ADD TASK</button>
    <Link href="/todos" onClick={saveCompleteTasks}>back to all todo!</Link>
    </div>
    )
    
    
    
  
}