import TodoItem from "@/TodoItem";
import Link from "next/link";
import { useEffect, useState } from 'react'


export default function Home(){
    // const todos = [{num: "question1", complete:false, task:"say hi"},
    // {num: "question2", complete:false, task:"say wow"},
    // {num: "question3", complete:false, task:"say bye"}];
    const [todos, setTodos] = useState([]);
    const [count, setCount] = useState(0);
    // const todolist = todos.map(todo =>{
    //      <ToDoItem num={todo.num} complete={todo.complete} task={todo.task}></ToDoItem>
    // })
    const API_ENDPOINT = "https://backend-q6v7.api.codehooks.io/dev/todos/";
    const API_KEY = "a000c16e-5ea8-4400-a25e-8a15f826ccb7";
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    function createTodo(){
        
        const fetchData = async () => {
            const response = await fetch(API_ENDPOINT, {
              'method':'POST',
              'headers': {'x-apikey': API_KEY,'Content-Type': 'application/json'},
              'body':JSON.stringify({"task": "testfromvscode","description": "ex desc", "complete": false})

            })
            const data = await response.json()
            setCount(count+1)
            //setPosts(data);
            //setLoading(false);
          }
          fetchData();
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
            // update state -- configured earlier.
            todosFromStorage = data;
            console.log("yeeter "+ todosFromStorage.length);
            console.log(todosFromStorage[0].task)

            for(let i = 0; i < todosFromStorage.length; i++){
                console.log("yeeter");
                if(!todosFromStorage[i].complete){
                    todosList.push({"task": todosFromStorage[i].task, "description": todosFromStorage[i].description, "complete": false, "created": todosFromStorage[i].createdOn});
                }
            }
            console.log(todosList.length);
            setTodos(todosList.sort((a, b)=>{
                if(a.createdOn>b.createdOn){
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
    function getTodos(){
        
    }
    // useEffect(() => {
    //     const fetchData = async () => {
    //       const response = await fetch(API_ENDPOINT, {
    //         'method':'GET',
    //         'headers': {'x-apikey': API_KEY}
    //       })
    //       const data = await response.json()
    //       // update state -- configured earlier.
    //       setPosts(data);
    //       setLoading(false);
    //     }
    //     fetchData();
    //   }, [])
    //   if(loading){
    //     return (<span>loading...</span>)
    //   }
    
    return <>
        <h2>TO DO LIST</h2>
        <TodoItem num="1" complete={true} task="hi"></TodoItem>
        
        {todos.map(todo =>{
             return <TodoItem num={todo.num} complete={todo.complete} task={todo.task}></TodoItem>
        })}
        <h3>Add New Task</h3>
        <input type="text"></input>
        <button onClick={createTodo}>ADD TASK</button>
        <br></br>
        <Link href="/done">VIEW COMPLETED TASKS!</Link>

    </>
    
        
    
}