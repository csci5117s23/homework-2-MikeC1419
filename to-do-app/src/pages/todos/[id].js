import { Patrick_Hand_SC } from "next/font/google";
import Link from "next/link";

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
    <h2>{oneTodo.task}</h2>
    <div> 
        <h3>{oneTodo.description}</h3>
        <div>Created On: {oneTodo.createdOn}</div>
        <div>Completed: {oneTodo.complete.toString()}</div>
    </div>
    <Link href="/todos">back to todo!</Link>
    </>
  
}