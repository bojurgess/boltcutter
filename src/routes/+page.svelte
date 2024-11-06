<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	let { form } = $props();

	function urlFromID(id: string) {
		if (!browser) return;
		return `${window.origin}/${id}`;
	}

	let url = $derived(urlFromID(form?.id));
</script>

<form method="POST" use:enhance>
	<label for="href" class="px-4 text-lg font-semibold">Enter a link to shorten</label>
	<div class="flex">
		<input
			type="text"
			name="href"
			class="rounded-l-2xl transition-colors focus:ring-0"
			placeholder="https://example.com"
			required
		/>
		<button
			type="submit"
			class="rounded-r-2xl border border-blue-500 bg-blue-500 px-4 text-white transition-colors hover:border-blue-600 hover:bg-blue-600"
			>Shorten</button
		>
	</div>
	{#if form}
		<p>Your link has been shortened to: <a href={url}>{url}</a></p>
	{/if}
</form>
