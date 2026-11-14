<script lang="ts">
    import { enhance } from '$app/forms';
    let { todo } = $props();
</script>

<form method="POST" action="?/toggleDone" use:enhance>
    <input type="hidden" name="id" value={todo.id} />
    <input type="hidden" name="isDone" value={String(!todo.isDone)} />
    <input type="checkbox" checked={todo.isDone} onchange={(e) => e.currentTarget.form?.requestSubmit()} /> Mark { todo.isDone ? 'Not Done' : 'Done'}
</form>