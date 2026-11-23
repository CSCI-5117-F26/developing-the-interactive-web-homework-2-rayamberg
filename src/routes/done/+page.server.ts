import { getTodos } from '#lib/server/db.ts'
import { redirect } from '@sveltejs/kit';

export async function load(event) {
    // auth check. 
    if (!event.locals.user) {
        redirect(303, '/');
    }
    // get todos where isDone is true (i.e. completed)
    return { todos: await getTodos({ isDone: true }) };
}