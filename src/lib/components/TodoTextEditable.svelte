<!-- should display a regular div with nice text when edit_mode is off, and when the event
is triggered, will switch it to some kind of text input that can then be saved -->
<script lang="ts">
    let { todo, edit_mode } = $props();

    //make an element active ("focused"), in this case the textarea when the user clicks Edit
    function focus(element: HTMLElement) {
        element.focus();
    }
</script>

{#if edit_mode}
<textarea use:focus class="textarea has-text-weight-light is-size-3 is-primary" name="text" value={todo.text}></textarea>
{:else}
<div class="is-size-2 has-text-weight-light mb-4">
    {todo.text}
</div>
{/if}