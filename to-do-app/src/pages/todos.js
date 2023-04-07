import TodoItem from "@/TodoItem";
import Link from "next/link";
import { useEffect, useState } from 'react'
import ToDoList from "@/ToDoList"


export default function Home(){
   
    // const todos = [{num: "question1", complete:false, task:"say hi"},
    // {num: "question2", complete:false, task:"say wow"},
    // {num: "question3", complete:false, task:"say bye"}];

    // const todolist = todos.map(todo =>{
    //      <ToDoItem num={todo.num} complete={todo.complete} task={todo.task}></ToDoItem>
    // })
    
    
    
    
    
    return <>
        <ToDoList></ToDoList>

    </>
    
        
    
}