import { useState } from "react"

export default function TodoItem({complete, task, date, desc,onTodoClick}){
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
                    <div className="label">{task}</div>
                    
                </div>
            </div>
        </>
    }
    return <>
        <div className="task">
            <div className="todo done-border" onClick={handleClick}>
                <div className="checkbox complete"></div>
                <div className="label">{task}</div>
             </div>
             
        </div>
    </>
}