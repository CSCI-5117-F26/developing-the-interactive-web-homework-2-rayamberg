<script lang="ts">
    let { todo } = $props();
</script>

<div class="todo-item">
<p><a href="/todo/{todo.id}">{todo.text}</a></p>
</div>