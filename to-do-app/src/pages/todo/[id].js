
import Link from "next/link";
import { UserButton} from '@clerk/nextjs';

export async function getStaticPaths() {
    const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const response = await fetch(API_ENDPOINT, {
        'method':'GET',
        'headers': {'x-apikey': API_KEY}
    })
    const data = await response.json();
    let ids = [];
    for (let i = 0; i < data.length; i ++){
        ids.push(
            {
                "params": {"id":data[i]._id}
            }
        );
    }
    return {
        paths: ids,
        fallback: false
    }
    
}
export async function getStaticProps(context){
    const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const id = context.params.id; 
    let endpoint = API_ENDPOINT + id;

    
    const response = await fetch(endpoint, {
        'method':'GET',
        'headers': {'x-apikey': API_KEY}
    })
    
    const data = await response.json();

    return{
        props: {oneTodo: data}
    }

}

export default function SingleTodo({oneTodo}) {
    return <>
    <div className="background">
      <div className="bar">
         <h2 id="top">TO DO LIST</h2>
         <UserButton></UserButton>
     </div>
    <h2>{oneTodo.task}</h2>
    <div> 
        <div>Created On: {oneTodo.createdOn}</div>
        <div>Completed: {oneTodo.complete.toString()}</div>
    </div>
    <Link href="/todos">back to todo!</Link>
    </div>
    </>
  
}
// import { Patrick_Hand_SC } from "next/font/google";
// import Link from "next/link";
// import { useAuth , UserButton} from '@clerk/nextjs';
// import { useRouter } from 'next/router'
// import { useEffect, useState, useRef } from "react";
// import TodoItem from "@/TodoItem";


// export default function IdPage() {
//     const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
//     const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
//     const todoTask = useRef();
//     const router = useRouter()
//     const { isLoaded, userId, sessionId, getToken } = useAuth();
//     const [oneTodo, setTodo] = useState([])
    

//     function completeTask(created){
//         let copy = [];
//         let i;
//         for(i = 0; i < todos.length; i++){
//             if(todos[i].created === created){
//                 console.log(todos[i].task + " found and setto  " +!todos[i].complete);
//                 copy[i] = todos[i];
//                 copy[i].complete = !copy[i].complete;
               
//             }
//             else{
//                 copy.push(todos[i]);
//             }
//         }
        
//         setTodos(copy);

//     }

//     useEffect(() => {
//         let todosFromStorage = []
//         let todosList = []
//         let value = router.asPath.split("/")[2]
//         while(value == "[id]"){
//             value = router.asPath.split("/")[2]
//         }
        
//         let endpoint = API_ENDPOINT +value;
//         const fetchData = async () => {
//         const response = await fetch(endpoint, {
//             'method':'GET',
//             'headers': {'x-apikey': API_KEY}
//         })
//         const data = await response.json()
        
//         todosFromStorage = data;
        
//         console.log(todosFromStorage)

//         todosList.push({"task": todosFromStorage.task, "description": todosFromStorage.description,"category": value, "complete": true, "created": todosFromStorage.createdOn, "id":todosFromStorage._id});

        
//         console.log(todosList)
//         setTodo(todosList)
//         }
//         fetchData();
//     },[]);

    
//     function saveCompleteTasks(){

//         for(let i = 0; i < todos.length; i++){
//             if(todos[i].complete){
//                 //console.log("updting "+ todos[i].task)
//                 const fetchData = async () => {
//                     let update = API_ENDPOINT+todos[i].id;
//                     const token = await getToken({template: 'codehooks'});
//                     const response = await fetch(update, {
//                       'method':'PATCH',
//                     //   'headers': {'x-apikey': API_KEY,'Content-Type': 'application/json'},
//                        headers: {
//                         'Authorization': 'Bearer ' + token,
//                         'Content-Type': 'application/json'
//                        },
//                       'body':JSON.stringify({"task": todos[i].task,"description": todos[i].description, "complete": true})
        
//                     })
//                     const data = await response.json()
                    
//                   }
//                   fetchData();
//             }
//         }
        
//     }
//     function editTask(){
//         if(todoTask.current.value == ""){
//             return;
//         }
//         let task = todoTask.current.value;
//         const fetchData = async () => {
//             const token = await test();
//             const response = await fetch(API_ENDPOINT, {
//               'method':'POST',
//                headers: {
//                 'Authorization': 'Bearer ' + token,
//                 'Content-Type': 'application/json'
//                 },
//               'body':JSON.stringify({"task": task,"description": token,"category": "sport", "complete": false})

//             })
//             const data = await response.json()
//             setCount(count+1)
//             todoTask.current.value =""
//           }
//           fetchData();
//     }
//     return (
//     <div className="background">
//      <div className="bar">
//         <h2 id="top">TO DO LIST</h2>
//         <UserButton></UserButton>
//     </div>
   
//     <h2>{oneTodo.task}</h2>
//      <h2>Task:  {oneTodo[0].task}</h2>
//      <br></br>
//      <input ref={todoTask} type="text" id="taskinput" required></input>
//      <button onClick={editTask} >Change Task Label</button>
//      <br></br>
//      <div> 
//          <div>Created On: {oneTodo[0].created} <br></br>Completed: {oneTodo[0].complete.toString()}<br></br>Completed: {oneTodo[0].category}</div>
//          <label for="taskinput">Change Category:</label>
//         <input ref={todoTask} type="text" id="taskinput" required></input>
//         <button>Change Task Category</button>
        
//      </div>
//      <Link href="/todos">back to todo!</Link>
    
//     </div>
//     )
    
    
    
  
// }    
// // import Link from "next/link";


// // export async function getStaticPaths() {
// //     const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
// //     const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
// //     const response = await fetch(API_ENDPOINT, {
// //         'method':'GET',
// //         'headers': {'x-apikey': API_KEY}
// //     })
// //     const data = await response.json();
// //     let ids = [];
// //     for (let i = 0; i < data.length; i ++){
// //         ids.push(
// //             {
// //                 "params": {"id":data[i]._id}
// //             }
// //         );
// //     }
// //     return {
// //         paths: ids,
// //         fallback: false
// //     }
    
// // }
// // export async function getStaticProps(context){
// //     const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
// //     const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
// //     const id = context.params.id; 
// //     let endpoint = API_ENDPOINT + id;

    
// //     const response = await fetch(endpoint, {
// //         'method':'GET',
// //         'headers': {'x-apikey': API_KEY}
// //     })
    
// //     const data = await response.json();

// //     return{
// //         props: {oneTodo: data}
// //     }

// // }

// // export default function SingleTodo({oneTodo}) {
// //     return <>
// //     <h2>{oneTodo.task}</h2>
// //     <label for="taskinput">Task:</label>
// //     <input ref={todoTask} type="text" id="taskinput" required></input>
// //      <button onClick={createTodo} onSubmit={createTodo}>Change Task Label</button>
// //     <div> 
// //         <div>Created On: {oneTodo.createdOn}</div>
// //         <div>Completed: {oneTodo.complete.toString()}<div className="checkbox complete"></div></div>
// //         <div>Category: {oneTodo.category}</div>
// //         <label for="taskinput">Task:</label>
// //         <input ref={todoTask} type="text" id="taskinput" required></input>
// //         <button onClick={createTodo} onSubmit={createTodo}>Change Task Category</button>
// //     </div>
// //     <Link href="/todos">back to todo!</Link>
// //     </>
  
// // }
