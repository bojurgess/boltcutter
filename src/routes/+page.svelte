<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	let { form }: { form: ActionData } = $props();

	function urlFromID(id: string | undefined) {
		if (!browser) return;
		return `${window.origin}/${id}`;
	}

	function copyToClipboard() {
		if (!url) return;

		navigator.clipboard.writeText(url);
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
		<p class="pt-2 text-center text-sm text-green-500">
			Success! Your link has been shortened. <button
				onclick={copyToClipboard}
				class="underline transition-colors hover:text-green-600">Click to copy to clipboard.</button
			>
		</p>
	{/if}
</form>
