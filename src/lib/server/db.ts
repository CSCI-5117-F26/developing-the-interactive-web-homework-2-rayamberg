/* Following instructions from https://www.mongodb.com/docs/drivers/node/current/connect/mongoclient/, although ignoring the stableapi params */
import type { Todo } from '#lib/types.js';
import { MongoClient, ObjectId } from 'mongodb';
import { MONGODB_URI } from '$app/env/private';

const client =  new MongoClient(MONGODB_URI);
const DB_NAME = 'faire';

export const db = client.db(DB_NAME);
export const todosColl = db.collection('todos');

/*TODO: Pun intended. 
- add return types for the exported functions. Apparently it's good practice to do that in TS */

/* getTodos() by default will return ALL todos. If you want just the active todos (not completed)
, then call getTodos({isDone: false}) and if you want only completed todos, call it with 
{isDone: true} */
export async function getTodos({ isDone }: { isDone? : boolean } = {}) {
   let filter : { isDone? : boolean } = {}
   if (isDone !== undefined) {
      filter =  { isDone };
   }
   /* we need to await toArray() since reading from find() returns one at a time for time 
   efficiency. We also sort by most recent, hence createdAt: -1 in the filter */
   const todos = await todosColl.find(filter).sort({ createdAt: -1 }).toArray();

   /* The id of each mongo doc is actually of type ObjectId. We want to convert this to a 
   string. Let's return that array instead.*/
   return todos.map((todo) => ({
    id: todo._id.toString(),
    text: todo.text,
    isDone: todo.isDone,
    createdAt: todo.createdAt
   }));
}
export async function getTodo(id: string) {
   const todo = await todosColl.findOne({ _id: new ObjectId(id) }); 
   if (!todo) return null;

   return {
      id: todo._id.toString(),
      text: todo.text,
      isDone: todo.isDone,
      createdAt: todo.createdAt
   }
}

export async function createTodo(text: string) {
   await todosColl.insertOne({ 
      text: text, 
      isDone: false,
      createdAt: new Date() 
   });
}

export async function deleteTodo(id: string) {
   await todosColl.deleteOne({"_id": new ObjectId(id)})
}

export async function setDone(id: string, isDone: boolean) {
   await todosColl.updateOne(
      { _id: new ObjectId(id) },
      { $set: { isDone }}
   );
}