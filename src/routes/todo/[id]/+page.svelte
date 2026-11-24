<script lang="ts">
	import AuthPanel from "#lib/components/AuthPanel.svelte";
import TodoDetail from "#lib/components/TodoDetail.svelte";
	import TodoItem from "#lib/components/TodoItem.svelte";

    let { data } = $props();
    let todo = $derived(data.todo); 
	let categories = $derived(data.categories);
</script>

<!-- <h1>todo/[id]</h1>
<p><strong>This page requires user login. If the user is not logged in redirect to /. There should also be a link to logout</strong></p>
<p>This page shows a specific todo item, with the following features:</p>
<ul>
    <li>this page shows the full to-do item, even if it is long (it is acceptable to show it in a text entry box if you wish)</li>
    <li>the user can edit and save the to-do item's text</li>
    <li>a user can mark the todo item as done</li>
    <li>A link to /todos</li>
</ul>
<h2>Challenge</h2>
Allow users to change the category of a todo item -->

<section class="section">
	<div class="container">
		<div class="columns is-centered">
			<div class="column is-half">
				<AuthPanel />
				<p class="mb-4"><a href="/todos">Back to todos</a></p>
                <TodoDetail {todo} {categories} />
			</div>
		</div>
	</div>
</section>
