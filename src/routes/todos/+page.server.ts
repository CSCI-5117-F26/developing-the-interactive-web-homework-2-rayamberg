import { getTodos } from '#lib/server/db.js'

export async function load() {
    return { todos: await getTodos() };
}