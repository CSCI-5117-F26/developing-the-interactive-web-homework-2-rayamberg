<script lang="ts">
	import '#lib/assets/shared.css'
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
