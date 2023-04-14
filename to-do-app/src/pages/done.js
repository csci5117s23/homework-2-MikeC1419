import TodoItem from "@/TodoItem";
import Link from "next/link";
import { useEffect, useState } from 'react'
import {UserButton } from "@clerk/nextjs";

export default function Home(){
    const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const [todos, setTodos] = useState([]);
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
        
        
        const fetchData = async () => {
            const response = await fetch(API_ENDPOINT, {
              'method':'GET',
              'headers': {'x-apikey': API_KEY}
            })
            const data = await response.json()
            todosFromStorage = data;
     

            for(let i = 0; i < todosFromStorage.length; i++){

                if(todosFromStorage[i].complete){
                    
                    todosList.push({"task": todosFromStorage[i].task, "description": todosFromStorage[i].description, "complete": true, "created": todosFromStorage[i].createdOn, "id":todosFromStorage[i]._id});
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
            setLoading(false);
            
        }
        fetchData();
        
    }, [])
    if(loading == true){
        return <>
            <div>HI There. Loading your completed ToDos</div>
        </>
    }
    function saveIncompleteTasks(){

        for(let i = 0; i < todos.length; i++){
            if(!todos[i].complete){
                const fetchData = async () => {
                    let update = API_ENDPOINT+todos[i].id;
                    const response = await fetch(update, {
                      'method':'PATCH',
                      'headers': {'x-apikey': API_KEY,'Content-Type': 'application/json'},
                      'body':JSON.stringify({"task": todos[i].task,"description": todos[i].description, "complete": false})
        
                    })
                    const data = await response.json()
                   
                  }
                  fetchData();
            }
        }
        
    }
    return <>
        <div className="background">
            <div className="bar">
             <h2 id="top">Completed Task List</h2>
             <UserButton></UserButton>
            </div>
       
        {todos.map(todo =>{
            return <TodoItem num={todo.num} complete={todo.complete} task={todo.task} date={todo.created} onTodoClick={completeTask}></TodoItem>
        })}
        <Link href="/todos" onClick={saveIncompleteTasks}>back to todo!</Link>
        </div>
    </>
        
    
}