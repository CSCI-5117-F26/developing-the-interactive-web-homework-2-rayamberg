<!-- should display a regular div with nice text when edit_mode is off, and when the event
is triggered, will switch it to some kind of text input that can then be saved -->
<script>
    let { todo, edit_mode } = $props();
</script>

{#if edit_mode}
<textarea class="textarea has-text-weight-light is-size-3 is-primary" name="text" value={todo.text}></textarea>
{:else}
<div class="is-size-2 has-text-weight-light mb-4">
    {todo.text}
</div>
{/if}