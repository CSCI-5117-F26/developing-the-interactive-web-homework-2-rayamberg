<script lang="ts">
	import { enhance } from '$app/forms';

    // consider making a Category type in types.ts
	let { categories } = $props();
</script>

<div class="box content">
	{#each categories as category}
		<span class="tag is-link is-light m-2"><a class="has-text-black" href="/todos/{category.name}">{category.name}</a>
        <form method="POST" action="?/deleteCat" use:enhance>
            <input type="hidden" name="id" value={category.id} />
            <button type="submit" class="delete is-small"></button>
        </form>
        </span> 
	{:else}
		<p>No categories created.</p>
	{/each}
	<form method="POST" action="?/createCat" use:enhance>
		<div class="field is-grouped">
			<div class="control">
				<input
					class="input is-small"
					type="text"
					name="name"
					placeholder="Add new category..."
				/>
			</div>
			<div class="control">
				<button class="button is-small is-secondary is-light" type="submit">+</button>
			</div>
		</div>
	</form>
</div>
