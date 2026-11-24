/* Following instructions from https://www.mongodb.com/docs/drivers/node/current/connect/mongoclient/, although ignoring the stableapi params */
import type { Todo } from '#lib/types.js';
import { MongoClient, ObjectId } from 'mongodb';
import { MONGODB_URI } from '$app/env/private';
import { error } from '@sveltejs/kit';

export const client = new MongoClient(MONGODB_URI);
const DB_NAME = 'faire';

export const db = client.db(DB_NAME);
export const todosColl = db.collection('todos');
export const catColl = db.collection('categories');

/*TODO: Pun intended. 
- add return types for the exported functions. Apparently it's good practice to do that in TS */

/* getTodos() by default will return ALL todos. If you want just the active todos (not completed)
, then call getTodos({isDone: false}) and if you want only completed todos, call it with 
{isDone: true} */
export async function getTodos(uid: string, { isDone, category }: { isDone?: boolean, category?: string } = {}) {
   let filter = {
      uid,
      ...(isDone !== undefined && { isDone }),
      ...(category && { category })
   };

   /* we need to await toArray() since reading from find() returns one at a time for time 
   efficiency. We also sort by most recent, hence createdAt: -1 in the filter */
   const todos = await todosColl.find(filter).sort({ createdAt: -1 }).toArray();

   /* The id of each mongo doc is actually of type ObjectId. We want to convert this to a 
   string. Let's return that array instead.*/
   return todos.map((todo) => ({
      id: todo._id.toString(),
      uid: todo.uid,
      text: todo.text,
      isDone: todo.isDone,
      createdAt: todo.createdAt,
      ...(todo.category && { category: todo.category })
   }));
}
export async function getTodo(uid: string, id: string) {
   const todo = await todosColl.findOne({ _id: new ObjectId(id), uid });
   if (!todo) error(400, 'Could not find todo.');

   return {
      id: todo._id.toString(),
      uid: todo.uid,
      text: todo.text,
      isDone: todo.isDone,
      createdAt: todo.createdAt,
      ...(todo.category && { category: todo.category })
   }
}

export async function createTodo(uid: string, text: string, category?: string) {
   let newTodo = {
      uid,
      text,
      isDone: false,
      createdAt: new Date()
   };

   //googled this one: this adds category key and value only if category is passed.
   newTodo = { ...newTodo, ...(category && { category }) }

   await todosColl.insertOne(newTodo);
}

export async function updateTodo(uid: string, id: string, text: string) {
   const result = await todosColl.updateOne(
      { _id: new ObjectId(id), uid },
      { $set: { text } }
   );

   if (result.matchedCount == 0) {
      error(400, 'Could not update todo')
   }
}

export async function setDone(uid: string, id: string, isDone: boolean) {
   const result = await todosColl.updateOne(
      { _id: new ObjectId(id), uid },
      { $set: { isDone } }
   );

   /* This condition will be met if the delete doesn't go through, which could mean funny 
   business, e.g. user trying to delete another user's todo, or something else */
   if (result.matchedCount == 0) {
      error(400, 'Count not  mark todo as done!')
   }
}

export async function getCategories(uid: string) {
   const cats = await catColl.find({ uid }).toArray();

   return cats.map((cat) => ({
      id: cat._id.toString(),
      name: cat.name
   }));
}

export async function createCategory(uid: string, name: string) {
   //still needs validation
   await catColl.insertOne({
      uid,
      name
   })
}

export async function deleteCategory(uid: string, id: string) {
   const result = await catColl.deleteOne({ _id: new ObjectId(id), uid });
   if (result.deletedCount == 0) {
      error(400, 'Could not delete category');
   }
}

export async function setCategory(uid: string, id: string, category: string) {
   if (category) {
      const result = await catColl.findOne({ uid, name: category });
      if (!result) {
         error(400, 'Invalid category');
      }
   }

   /* change category to new one. If we receive "" the user chose to unset the category */
   const updateFilter = category ? { $set: { category }} : { $unset: { category}};
   
   const result = await todosColl.updateOne({_id: new ObjectId(id), uid}, updateFilter);

   if (result.matchedCount == 0) error(400, 'Could not find todo');
}