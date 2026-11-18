/* from Better Auth documentation */
import { auth } from "#lib/auth.js"; // SvelteKit 2: "$lib/auth"
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/env"; // SvelteKit 2: "$app/environment"

export async function handle({ event, resolve }) {
    return svelteKitHandler({ event, resolve, auth, building });
}