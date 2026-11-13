<script lang="ts">
    import { enhance } from '$app/forms';
    let { todo } = $props();
</script>

<div class="todo-item">
<p>id: {todo.id}</p>
<p>{todo.text}</p>
<p>{todo.isDone}</p>
<form method="POST" action="?/toggleDone" use:enhance>
    <input type="hidden" name="id" value={todo.id} />
    <input type="hidden" name="isDone" value={String(!todo.isDone)} />
    <input type="checkbox" checked={todo.isDone} onchange={(e) => e.currentTarget.form?.requestSubmit()} /> Mark { todo.isDone ? 'Not Done' : 'Done'}
</form>
<form method="POST" action="?/delete" use:enhance>
    <label>
        <input type="hidden" name="id" value={todo.id} />
        <input type="submit" value="Delete" />
    </label>
</form>
</div>