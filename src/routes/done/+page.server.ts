import { getAuthedUser } from '#lib/server/auth-helpers.js';
import { getTodos } from '#lib/server/db.ts'
import { redirect } from '@sveltejs/kit';

export async function load(event) {
    // auth check. 
    const user = getAuthedUser(event.locals);
    const uid = String(user.id);

    // get todos where isDone is true (i.e. completed)
    return { todos: await getTodos(uid, { isDone: true }) };
}