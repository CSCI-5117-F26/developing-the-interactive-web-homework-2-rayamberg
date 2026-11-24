import { getAuthedUser } from '#lib/server/auth-helpers.js';
import { catColl, createCategory, createTodo, deleteCategory, getCategories, getTodos, setDone} from '#lib/server/db.ts'
import { error } from '@sveltejs/kit';

export async function load(event) {
    // auth check. 
    const user = getAuthedUser(event.locals);
    const uid = String(user.id);
    
    //category check
    const category = await catColl.findOne({ uid, name: event.params.category});
    if (!category) {
        error(404, 'No category found.')
    }
        
    // get all todos where isDone is false (i.e. incomplete)
    return { 
        todos: await getTodos(uid, {isDone: false, category: category.name}),
        categories: await getCategories(uid),
        category: category.name
     };
}

export const actions = {
    create: async ({ locals, request, params }) => {
        const data = await request.formData();
        const text = String(data.get('text'));
        const user = getAuthedUser(locals);
        const category = params.category;
        const uid = String(user.id);

        await createTodo(uid, text, category);
    },
    toggleDone: async ({ locals, request }) => {
        const data = await request.formData();
        const id = String(data.get('id'));
        const user = getAuthedUser(locals);
        const uid = String(user.id);
        //convert isDone's value from string to boolean
        const isDone = data.get('isDone') === 'true';

        await setDone(uid, id, isDone);
    },
    createCat: async ({ locals, request }) => {
        const data = await request.formData();
        const name = String(data.get('name'));
        const user = getAuthedUser(locals);
        const uid = String(user.id);

        await createCategory(uid, name);
    },
    deleteCat: async ({ locals, request }) => {
        const data = await request.formData();
        const id = String(data.get('id'));
        const user = getAuthedUser(locals);
        const uid = String(user.id);

        await deleteCategory(uid, id);
    }
};