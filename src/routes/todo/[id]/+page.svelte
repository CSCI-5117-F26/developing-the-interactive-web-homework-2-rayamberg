<script lang="ts">
	import TodoItemControls from '#lib/components/TodoItemControls.svelte';

    let { data } = $props();
    let todo = $derived(data.todo); 
</script>

<h1>todo/[id]</h1>
<p><strong>This page requires user login. If the user is not logged in redirect to /. There should also be a link to logout</strong></p>
<p>This page shows a specific todo item, with the following features:</p>
<ul>
    <li>this page shows the full to-do item, even if it is long (it is acceptable to show it in a text entry box if you wish)</li>
    <li>the user can edit and save the to-do item's text</li>
    <li>a user can mark the todo item as done</li>
    <li>A link to /todos</li>
</ul>
<h2>Challenge</h2>
Allow users to change the category of a todo item

<p><a href="/todos">Back to Todos</a></p>
<h1>{todo.text}</h1>
<p>This todo's done value is: {todo.isDone}</p>
<p>Its id is {todo.id}</p>
<p>It was created at {todo.createdAt}</p>
<TodoItemControls todo={todo} />