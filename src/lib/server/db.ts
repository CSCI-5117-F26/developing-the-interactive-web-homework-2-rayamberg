/* Following instructions from https://www.mongodb.com/docs/drivers/node/current/connect/mongoclient/, although ignoring the stableapi params */
import type { Todo } from '#lib/types.js';
import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$app/env/private';

const client =  new MongoClient(MONGODB_URI);
const DB_NAME = 'faire';

export const db = client.db(DB_NAME);
export const todosColl = db.collection('todos');

export async function getTodos() : Promise<Todo[]> {
   //we need to await toArray() since reading from find() returns one at a time for time efficiency
   const todos = await todosColl.find().toArray();

   /* The id of each mongo doc is actually of type ObjectId. We want to convert this to a 
   string. Let's return that array instead.*/
   return todos.map((todo) => ({
    id: todo._id.toString(),
    text: todo.text,
    isDone: todo.isDone
   }));
}

export async function createTodo(text: string) {
   await todosColl.insertOne({ text: text, isDone: false });
}