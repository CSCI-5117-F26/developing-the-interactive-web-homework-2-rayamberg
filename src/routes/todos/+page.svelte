<script lang="ts">
    import { enhance } from '$app/forms';
    let { data }  = $props();
</script>

<h1>Todos</h1>
<p><strong>This page requires user login. If the user is not logged in redirect to /. There should also be a link to logout</strong></p>
<p>This page should show a list of to-do items with the following features.</p>
<ul>
    <li>a text box and a submit button to create a new todo item</li>
    <li>a list of to-do items that have not been marked “done”; sorted by most-recently created, and hyperlinked to /todo/:id. Each of these to-do items must have:
    <ul>
        <li>a summary of the todo item's contents (if it's too long to display, show a preview limited to one line)</li>
        <li>a button or checkbox that allow you to mark a todo item as done</li>
    </ul></li>
    <li>a link to visit /done</li>
</ul>

<form method="POST" action="?/create" use:enhance>
    <label>
        <input type="text" name="text" /><input type="submit" value="Add Todo">
    </label>
</form>
{#each data.todos as todo (todo.id)}
<div class="todo-item">
<p>id: {todo.id}</p>
<p>{todo.text}</p>
<p>{todo.isDone}</p>
<form method="POST" action="?/delete" use:enhance>
    <label>
        <input type="hidden" name="id" value={todo.id} />
        <input type="submit" value="Delete" />
    </label>
</form>
</div>
{/each}