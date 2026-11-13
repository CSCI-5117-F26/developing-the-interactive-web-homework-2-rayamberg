import { getTodo } from '#lib/server/db.ts'

export async function load({ params }) {
    return { todo: await getTodo(params.id) };
}