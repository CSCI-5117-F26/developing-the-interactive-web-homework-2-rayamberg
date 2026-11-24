import { getAuthedUser } from '#lib/server/auth-helpers.js';
import { getTodo, updateTodo, setDone, getCategories } from '#lib/server/db.ts'

export async function load({ locals, params }) {
	// auth check. 
	const user = getAuthedUser(locals);
	const uid = String(user.id);

	return { 
		todo: await getTodo(uid, params.id),
		categories: await getCategories(uid)
	};
}

export const actions = {
	update: async ({ locals, request }) => {
		const data = await request.formData();
		const id = String(data.get('id'));
		const user = getAuthedUser(locals);
		const uid = String(user.id);
		const text = String(data.get('text'));

		await updateTodo(uid, id, text);
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