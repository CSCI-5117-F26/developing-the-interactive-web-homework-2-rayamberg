/* Functions to determine whether a user is signed in, has access/authority, etc. */
import { redirect } from '@sveltejs/kit';

/* Better Auth code has auth'd user data going into event.locals.user, hence why we are passing
locals into this function */
export function getAuthedUser(locals: App.Locals) {
    //if the user session isn't in locals, they aren't logged in...
    if (!locals.user) redirect(303, '/');

    return locals.user;
}