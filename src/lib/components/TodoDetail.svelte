<script lang="ts">
	import TodoItemControls from "./TodoItemControls.svelte";

    let { todo } = $props();
</script>

<div class="box content">
    <h1>Todo</h1>
    <div class="is-size-2 has-text-weight-light mb-4">
    {todo.text}
    </div>
    <div class="is-flex">
        <TodoItemControls {todo} /> <span class="ml-2">{ todo.isDone ? 'Mark Active' : 'Mark Complete'}</span>
    </div>
</div>