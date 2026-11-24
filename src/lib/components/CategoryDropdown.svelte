<script lang="ts">
    import { enhance } from '$app/forms';
    let { todo, categories } = $props();
</script>

<form method="POST" action="?/updateCat" use:enhance>
    <input type="hidden" name="id" value={todo.id} />
    <select id="cat-select" name="category">
    {#each categories as category (category.id)}
      <option value={category.name} selected={category.name === todo.category}>
        {category.name}
    </option>
    {/each}
    </select>
</form>