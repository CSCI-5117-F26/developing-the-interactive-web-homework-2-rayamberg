/* Following instructions from https://www.mongodb.com/docs/drivers/node/current/connect/mongoclient/, although ignoring the stableapi params */
import type { Todo } from '#lib/types.js';
import { MongoClient, ObjectId } from 'mongodb';
import { MONGODB_URI } from '$app/env/private';

const client =  new MongoClient(MONGODB_URI);
const DB_NAME = 'faire';

export const db = client.db(DB_NAME);
export const todosColl = db.collection('todos');

export async function getTodos() : Promise<Todo[]> {
   /* we need to await toArray() since reading from find() returns one at a time for time 
   efficiency. We also sort by most recent, hence createdAt: -1 in the filter */
   const todos = await todosColl.find().sort({ createdAt: -1 }).toArray();

   /* The id of each mongo doc is actually of type ObjectId. We want to convert this to a 
   string. Let's return that array instead.*/
   return todos.map((todo) => ({
    id: todo._id.toString(),
    text: todo.text,
    isDone: todo.isDone,
    createdAt: todo.createdAt
   }));
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