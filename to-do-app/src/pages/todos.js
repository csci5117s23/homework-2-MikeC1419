import TodoItem from "@/TodoItem";
import Link from "next/link";
import { useEffect, useState, useRef } from 'react'
import ToDoList from "@/ToDoList"
import { RedirectToSignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useAuth } from '@clerk/nextjs';
import { useRouter } from "next/router";



export default function Home(){
    const [todos, setTodos] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [authFail, setAuthFail] = useState(false);
    const todoTask = useRef();
    //const router = useRouter();
    const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
    //const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    // console.log(userId)
    async function test() {
        const token = await getToken({template: 'codehooks'})
        console.log("HERE is the token " +token)
        if(token == null){
            setAuthFail(true)
        }
        return token;
    }
    
    

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
        // if(!isLoaded || !userId){ //TA HELP ME
        //     router.push("/")
        // }
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
            //const token = await getToken({ template: "codehooks" }); 
            // const response = await fetch(API_ENDPOINT, {
            //   'method':'GET',
            //   'headers': {'x-apikey': API_KEY}
            // })
            
            const token = await test();
            // console.log("TOKEN "+ token)

            //_____________________________
            if(token != null){
                const response = await fetch(API_ENDPOINT, {
                    'method':'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                })
                const data = await response.json()
                todosFromStorage = data;
                todosFromStorage = todosFromStorage.reverse()
                function func(item){
                    //console.log("item filters " + item.complete)
                    return !item.complete;
                }
                //console.log("LENGTH "+  + " "+todosFromStorage.length);
                todosFromStorage =todosFromStorage.filter(func);
                //console.log("LENGTH After "+todosFromStorage.length);

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
            
         }
        fetchData();
        
      }, [count,isLoaded])
      if(authFail){
        return<>
        <SignedOut>
            <RedirectToSignIn></RedirectToSignIn>
        </SignedOut>
        </>
      }
      if(loading == true){
        return <>
            <div>HI There. Loading your ToDo List</div>
        </>
      }
      
      function createTodo(){
        if(todoTask.current.value == ""){
            return;
        }
        let task = todoTask.current.value;
        const fetchData = async () => {
            const token = await test();
            const response = await fetch(API_ENDPOINT, {
              'method':'POST',
               headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
                },
              'body':JSON.stringify({"task": task,"description": token,"category": "sport", "complete": false})

            })
            const data = await response.json()
            setCount(count+1)
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
                    const token = await test();
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
   
    
    return <>
        <SignedOut>
            <RedirectToSignIn></RedirectToSignIn>
        </SignedOut>
        <SignedIn>
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
        })}
        <h3>Add New Task</h3>
        <label for="taskinput">Task:</label>
        <input ref={todoTask} type="text" id="taskinput" required></input>
        <button onClick={createTodo} onSubmit={createTodo}>ADD TASK</button>
        <br></br>
        <br></br>
        <Link href="/done" onClick={saveCompleteTasks}>VIEW COMPLETED TASKS!</Link>
        
        </div>
        </SignedIn>

    </>
    
        
    
}