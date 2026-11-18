/* from Better Auth documentation */
import { auth } from "#lib/auth.js"; // SvelteKit 2: "$lib/auth"
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/env"; // SvelteKit 2: "$app/environment"

export async function handle({ event, resolve }) {
    // Fetch current session from Better Auth
    const session = await auth.api.getSession({
        headers: event.request.headers,
    });

    // Make session and user available on server
    if (session) {
        event.locals.session = session.session;
        event.locals.user = session.user;
    }

    return svelteKitHandler({ event, resolve, auth, building });
}