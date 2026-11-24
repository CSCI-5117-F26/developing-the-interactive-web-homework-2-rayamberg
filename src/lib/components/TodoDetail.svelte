<script lang="ts">
	import TodoItemControls from './TodoItemControls.svelte';
	import CategoryDropdown from './CategoryDropdown.svelte';

	let { todo, categories } = $props();
	let edit_mode = $state(false);

    function focus(element: HTMLElement) {
        element.focus();
    }
</script>

<div class="card">
	<header class="card-header">
		<p class="card-header-title">Todo</p>
	</header>
	<div class="card-content">
        {#if edit_mode}
        <form method="POST" action="?/update">
                    <input type="hidden" name="id" value={todo.id} />
                    <textarea use:focus class="textarea has-text-weight-light is-size-3 is-primary" name="text" value={todo.text}></textarea>
		<footer class="card-footer">
					<button class="card-footer-item button is-primary is-light">Save</button>
					<button
						class="card-footer-item button is-secondary is-light"
						onclick={() => {
							edit_mode = false;
						}}>Cancel</button
					>
		</footer>
				</form>
                {:else}
        <div class="is-size-2 has-text-weight-light mb-4">{todo.text}</div>
		<div class="is-flex mb-2">
   
			<TodoItemControls {todo} /> <span class="ml-2">Done</span>
			<CategoryDropdown {todo} {categories} />
		</div>
		<footer class="card-footer">
				<button
					class="card-footer-item button is-primary is-light"
					onclick={() => {
						edit_mode = true;
					}}>Edit</button
				>
        </footer>
        {/if}
	</div>
</div>
