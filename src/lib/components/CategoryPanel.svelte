<script lang="ts">
	import { enhance } from '$app/forms';

	const categories = ['butthole', 'mooth'];
</script>

<div class="box content">
	{#each categories as category}
		<span class="tag is-link is-light m-2"><a href="/todo/{category}">{category}</a><a href="#" class="ml-3"><small>❌</small></a></span>
        
	{:else}
		<p>No categories created.</p>
	{/each}
	<form method="POST" action="?/createCat" use:enhance>
		<div class="field is-grouped">
			<div class="control">
				<input
					class="input is-small"
					type="text"
					name="category"
					placeholder="Add new category..."
				/>
			</div>
			<div class="control">
				<button class="button is-small is-secondary is-light" type="submit">+</button>
			</div>
		</div>
	</form>
</div>
