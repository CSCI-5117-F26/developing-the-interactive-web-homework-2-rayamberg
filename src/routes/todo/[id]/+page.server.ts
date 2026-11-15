import { getTodo, setDone } from '#lib/server/db.ts'

export async function load({ params }) {
    //TODO: validation, including null
    return { todo: await getTodo(params.id) };
}

export const actions = {
	toggleDone: async ({ request }) => {
		const data = await request.formData();
		const id = String(data.get('id'));
		//convert isDone's value from string to boolean
		const isDone = data.get('isDone') === 'true';

		await setDone(id, isDone);
	}
};