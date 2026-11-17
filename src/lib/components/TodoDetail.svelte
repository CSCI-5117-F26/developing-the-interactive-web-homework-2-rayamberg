<script lang="ts">
	import TodoItemControls from "./TodoItemControls.svelte";
	import TodoTextEditable from "./TodoTextEditable.svelte";

    let { todo } = $props();
</script>

<div class="card">
    <header class="card-header">
        <p class="card-header-title">Todo</p>
    </header>
    <div class="card-content">
      <TodoTextEditable {todo} />
        <div class="is-flex mb-2">
            <TodoItemControls {todo} /> <span class="ml-2">Done</span>
        </div>
        <footer class="card-footer">
            <a href="#" class="card-footer-item">Edit</a>
            <a class="card-footer-item has-text-grey-light" aria-disabled="true">Save</a>
        </footer>
    </div>
</div>