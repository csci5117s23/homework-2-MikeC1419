import { useState } from "react"

export default function TodoItem({complete, task, date, onTodoClick}){
    //const [done, setDone] = useState(complete);
    //console.log(task + " Renrndering ");
    function handleClick(){

        onTodoClick(date);
    }
    
    if(!complete){
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