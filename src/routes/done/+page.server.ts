import { getTodos } from '#lib/server/db.ts'

export async function load() {
    return { todos: await getTodos() };
}