<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-sonner';
	let { children } = $props();
</script>

<svelte:head>
	<title>boltcutter.</title>
	<meta name="description" content="A URL shortening service" />
	<meta name="keywords" content="url, shortener, link, shortening" />
	<meta name="author" content="Boltcutter" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<Toaster position="top-center" richColors />
{@render children()}
