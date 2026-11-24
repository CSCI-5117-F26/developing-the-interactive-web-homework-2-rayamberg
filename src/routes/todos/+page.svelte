<script lang="ts">
	import { enhance } from '$app/forms';
	import TodoItem from '#lib/components/TodoItem.svelte';
	import TodoItemControls from '#lib/components/TodoItemControls.svelte';
	import AuthPanel from '#lib/components/AuthPanel.svelte';
	import CategoryPanel from '#lib/components/CategoryPanel.svelte';
	let { data } = $props();
</script>

<section class="section">
	<div class="container">
		<div class="columns is-centered">
			<div class="column is-half">
				<AuthPanel />
				<h1 class="title">Active Todos</h1>
				<p class="mb-4"><a href="/done">See finished todos</a></p>

				<form method="POST" action="?/create" use:enhance class="mb-5">
					<div class="field is-grouped">
						<div class="control is-expanded">
							<input class="input" type="text" name="text" />
						</div>
						<div class="control">
							<button class="button is-primary is-light" type="submit">Add Todo</button>
						</div>
					</div>
				</form>
				<h2 class="subtitle">Categories</h2>
				<CategoryPanel />
				<div class="is-flex has-text-weight-bold pb-2">
					<div class="has-text-centered" style="width: 9rem;">Mark Done</div>
					<div>Task</div>
				</div>

				{#each data.todos as todo (todo.id)}
					<div
						class="is-flex is-align-items-center py-2"
						style="border: 0.5px solid; border-radius: 6px;"
					>
						<div class="has-text-centered" style="width: 9rem;"><TodoItemControls {todo} /></div>
						<div style="min-width: 0; flex: 1"><TodoItem {todo} /></div>
						<!-- This is where I'm thinking we'll want to put the category -->
						<!-- <span class="tag">Category</span> -->
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
