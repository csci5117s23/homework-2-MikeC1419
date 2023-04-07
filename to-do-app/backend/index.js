
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, bool } from 'yup';

const flashCardYup = object({
    front: string().required(),
    back: string().required(),
    category: string().required(),
    createdOn: date().default(() => new Date()),
})
const todoYup = object({
    task: string().required(),
    description: string(),
    complete: bool().required(),
    createdOn: date().default(() => new Date()),
})


app.get("/test",  (req, res)=>{
    res.json({result: "you did it"});
})
// Use Crudlify to create a REST API for any collection
crudlify(app, {todos: todoYup})

// bind to serverless runtime
export default app.init();
