<script lang="ts">
	import TodoItem from '#lib/components/TodoItem.svelte';
	let { data } = $props();
</script>

<section class="section">
	<div class="container">
		<div class="columns is-centered">
			<div class="column is-half">
				<h1 class="title">Completed Todos</h1>
				<p class="mb-4"><a href="/todos">See active todos</a></p>

				{#each data.todos as todo (todo.id)}
					<div
						class="is-done is-flex is-align-items-center py-2"
						style="border: 0.5px solid; border-radius: 6px;"
					>
						<div class="ml-2 is-italic" style="min-width: 0; flex: 1;"><TodoItem {todo} /></div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
    .is-done {
        opacity: 0.5;
    }
</style>
