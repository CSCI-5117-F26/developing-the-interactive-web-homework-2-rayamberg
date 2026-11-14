<script lang="ts">
    import TodoItem from '#lib/components/TodoItem.svelte';
    let { data }  = $props();
</script>

<!-- <h1>Done</h1>
<p><strong>This page requires user login. If the user is not logged in redirect to /. There should also be a link to logout</strong></p>
<p>This page is just like /todos except:</p>
<ul>
    <li>no interface to create new todos</li>
    <li>show only the todo items that have been marked as done</li>
    <li>add visual indicator on page that these are done items</li>
    <li>a link to /todos</li>
</ul> -->

<p><a href="/todos">See active todos</a></p>
<h1>Done Todos</h1>
{#each data.todos as todo (todo.id)}
    <TodoItem todo={todo} />
{/each}