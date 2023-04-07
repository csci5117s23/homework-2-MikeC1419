import { useState } from "react"

export default function TodoItem({num, complete, task}){
    const [done, setDone] = useState(complete);
    
    function handleClick(){
        
        console.log(task + " before" +done);
        setDone(!done);
        console.log(task + " after " +done);
    }
    if(!done){
        return <>
            <div className="task">
                <div className="todo" onClick={handleClick}>
                    <div className="checkbox"></div>
                    <div className="label"><p>{task}</p></div>
                </div>
            </div>
        </>
    }
    return <>
        <div className="task done-border">
            <div className="todo" onClick={handleClick}>
                <div className="checkbox complete"></div>
                <div className="label"><p>{task}</p></div>
             </div>
        </div>
    </>
}