/* From Svelte documentation for creating env vars */
import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
    MONGODB_URI: {}
});
