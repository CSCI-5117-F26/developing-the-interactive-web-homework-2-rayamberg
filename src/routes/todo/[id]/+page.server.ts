import { getAuthedUser } from '#lib/server/auth-helpers.js';
import { getTodo, updateTodo, setDone } from '#lib/server/db.ts'

export async function load({ locals, params }) {
	// auth check. 
	const user = getAuthedUser(locals);

	//TODO: validation, including null
	return { todo: await getTodo(params.id) };
}

export const actions = {
	update: async ({ request }) => {
		const data = await request.formData();
		const id = String(data.get('id'));
		const text = String(data.get('text'));

		await updateTodo(id, text);
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