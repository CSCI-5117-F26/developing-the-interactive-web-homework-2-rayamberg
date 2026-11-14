import { createTodo, deleteTodo, getTodos, setDone} from '#lib/server/db.ts'

export async function load() {
	// get all todos where isDone is false (i.e. incomplete)
    return { todos: await getTodos({isDone: false}) };
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