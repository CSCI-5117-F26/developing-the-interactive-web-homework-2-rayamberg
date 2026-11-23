import { redirect } from "@sveltejs/kit"

export async function load(event) {
    // auth check. 
    if (event.locals.user) {
        redirect(303, '/todos');
    }
}