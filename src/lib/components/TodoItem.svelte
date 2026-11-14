<script lang="ts">
    let { todo } = $props();
</script>

<div class="todo-item">
<p>id: {todo.id}</p>
<p><a href="/todo/{todo.id}">{todo.text}</a></p>
<p>{todo.isDone}</p>
</div>