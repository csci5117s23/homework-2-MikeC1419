
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, bool } from 'yup';
import jwtDecode from 'jwt-decode';

// This can largely be copy-pasted, it just grabs the authorization token and parses it, stashing it on the request.
const userAuth = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (authorization) {
        const token = authorization.replace('Bearer ','');
        // NOTE this doesn't validate, but we don't need it to. codehooks is doing that for us.
        const token_parsed = jwtDecode(token);
        req.user_token = token_parsed;
      }
      next();
    } catch (error) {
      next(error);
    } 
  }
app.use(userAuth)

// some extra logic for GET / and POST / requests.
app.use('/todo', (req, res, next) => {
    if (req.method === "POST") {
        // always save authenticating user Id token.
        // note -- were not enforcing uniqueness which isn't great.
        // we don't currently have a great way to do this -- one option would be to 
        // have a user collection track which collections have been filled
        // It's a limitation for sure, but I'll just make that a front-end problem...
        req.body.userId = req.user_token.sub
    } else if (req.method === "GET") {
        // on "index" -- always check for authentication.
        req.query.userId = req.user_token.sub
    }
    next();
})

app.use('/todo/:id', async (req, res, next) => {
    const id = req.params.ID;
    const userId = req.user_token.sub
    // let's check access rights for the document being read/updated/replaced/deleted
    const conn = await Datastore.open();
    try {
        console.log(id);
        const doc = await conn.getOne('todos', id)
        console.log("\n\n\nID:"+id + " userID:"+ userId + " doc.description:"+ doc.description+"\n\n")
        if (doc.description != userId) {
            // authenticate duser doesn't own this document.
            res.status(403).end(); // end is like "quit this request"
            //return "helloist world"
        }
    } catch (e) {
        console.log(e);
        // the document doesn't exist.
        res.status(404).end(e);
        //return "yeet the what error";
    }
    // if we don't crash out -- call next and let crudlify deal with the details...
    next();
})

const todoYup = object({
    task: string().required(),
    description: string().required(),
    complete: bool().required(),
    category: string(),
    createdOn: date().default(() => new Date()),
})


app.get("/test",  (req, res)=>{
    res.json({result: "you did it"});
})
//app.get("/todos")
// Use Crudlify to create a REST API for any collection
crudlify(app, {todos: todoYup})

// bind to serverless runtime
export default app.init();
