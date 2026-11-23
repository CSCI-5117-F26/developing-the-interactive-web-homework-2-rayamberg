import { getTodo, updateTodo, setDone } from '#lib/server/db.ts'
import { redirect } from '@sveltejs/kit';

export async function load({ locals, params }) {
	// auth check. 
	if (!locals.user) {
		redirect(303, '/');
	}

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
	toggleDone: async ({ request }) => {
		const data = await request.formData();
		const id = String(data.get('id'));
		//convert isDone's value from string to boolean
		const isDone = data.get('isDone') === 'true';

		await setDone(id, isDone);
	}
};