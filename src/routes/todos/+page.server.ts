import { getAuthedUser } from '#lib/server/auth-helpers.js';
import { createTodo, getTodos, setDone} from '#lib/server/db.ts'

export async function load(event) {
	// auth check. 
	const user = getAuthedUser(event.locals);
	const uid = String(user.id);

	// get all todos where isDone is false (i.e. incomplete)
    return { todos: await getTodos(uid, {isDone: false}) };
}

export const actions = {
	create: async ({ locals, request }) => {
		const data = await request.formData();
        const text = String(data.get('text'));
		const user = getAuthedUser(locals);
		const uid = String(user.id);

		await createTodo(uid, text);
	},
	toggleDone: async ({ locals, request }) => {
		const data = await request.formData();
		const id = String(data.get('id'));
		const user = getAuthedUser(locals);
		const uid = String(user.id);
		//convert isDone's value from string to boolean
		const isDone = data.get('isDone') === 'true';

		await setDone(uid, id, isDone);
	}
};