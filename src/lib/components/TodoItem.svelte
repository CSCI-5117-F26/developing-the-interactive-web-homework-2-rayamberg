<script lang="ts">
    let { todo } = $props();
</script>

<div class="todo-item">
<a href="/todo/{todo.id}">{todo.text}</a>
</div>

<style>
/* stolen from https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-overflow
and from https://css-tricks.com/flexbox-truncated-text/. How I understand what's happening here: 
The white-space nowrap makes our long line of text force to one line, which then causes overflow, however, its div by default will grow to allow it all to exist and overflow. With min-width: 0 (set in the parent div), we are forcing it to shrink to the space left in the parent. We then hide the overflow text and replace it with an ellipsis with the overflow and text-overflow properties. We also added flex: 1 to keep uniformity in the box's size, otherwise smaller divs are not aligned. */
.todo-item {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>