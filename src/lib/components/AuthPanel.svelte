<script lang="ts">
	import { authClient } from '#lib/auth-client.js';
	const session = authClient.useSession();
	import { goto } from '$app/navigation';

    async function signOut() {
       await authClient.signOut();
       // invalidateAll is like a reset: forces server reload
       await goto('/', { invalidateAll: true}) 
    }
</script>

 {#if $session.data }
 <p>Signed in: {$session.data.user.email} 
<button class="button is-small" onclick={signOut}> Sign Out</button></p>
{/if}