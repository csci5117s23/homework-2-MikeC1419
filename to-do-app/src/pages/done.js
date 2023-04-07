import TodoItem from "@/TodoItem";
import Link from "next/link";

export default function Home(){
    return <>
        <h2>COMPLETED TASK LIST</h2>
        <TodoItem num="1" complete={true} task="yeet"></TodoItem>
        <Link href="/todos">back to todo!</Link>
        <div>hi</div>
    </>
        
    
}