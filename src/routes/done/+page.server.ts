import { getTodos } from '#lib/server/db.ts'

export async function load() {
    // get todos where isDone is true (i.e. completed)
    return { todos: await getTodos({isDone: true}) };
}