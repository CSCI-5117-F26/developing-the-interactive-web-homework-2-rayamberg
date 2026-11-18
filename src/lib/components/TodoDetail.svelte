<script lang="ts">
	import TodoItemControls from "./TodoItemControls.svelte";
	import TodoTextEditable from "./TodoTextEditable.svelte";

    let { todo } = $props();
    let edit_mode = $state(false);
</script>

<div class="card">
    <header class="card-header">
        <p class="card-header-title">Todo</p>
    </header>
    <div class="card-content">
      <TodoTextEditable {todo} {edit_mode}/>
        <div class="is-flex mb-2">
            <TodoItemControls {todo} /> <span class="ml-2">Done</span>
        </div>
        <footer class="card-footer">
            {#if edit_mode}
            <button class="card-footer-item button is-primary is-light">Save</button>
            <button class="card-footer-item button is-secondary is-light" onclick={() => { edit_mode = false;}}>Cancel</button>
            {:else}
            <button class="card-footer-item button is-primary is-light" onclick={() => { edit_mode = true; }}>Edit</button>
            {/if}
        </footer>
    </div>
</div>