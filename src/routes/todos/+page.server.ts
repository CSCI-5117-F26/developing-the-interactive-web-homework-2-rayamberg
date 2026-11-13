//apparently we need to call this db.js even though it is TS
import { deleteTodo, getTodos, setDone} from '#lib/server/db.js'
import { createTodo } from '#lib/server/db.js';

export async function load() {
    return { todos: await getTodos() };
}

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
        const text = String(data.get('text'));

		await createTodo(text);
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = String(data.get('id'));

		await deleteTodo(id);
	},
	toggleDone: async ({ request }) => {
		const data = await request.formData();
		const id = String(data.get('id'));
		//convert isDone's value from string to boolean
		const isDone = data.get('isDone') === 'true';

		await setDone(id, isDone);
	}
};