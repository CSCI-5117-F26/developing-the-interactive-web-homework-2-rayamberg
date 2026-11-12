//apparently we need to call this db.js even though it is TS
import { getTodos } from '#lib/server/db.js'
import { createTodo } from '#lib/server/db.js';

export async function load() {
    return { todos: await getTodos() };
}

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
        const text = String(data.get('text'));

		createTodo(text);
	}
};