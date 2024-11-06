<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import type { ActionData } from './$types';
	let { form }: { form: ActionData } = $props();

	function urlFromID(id: string | undefined) {
		if (!browser) return;
		return `${window.origin}/${id}`;
	}

	function copyToClipboard() {
		if (!url) {
			toast.error('No link to copy!');
			return;
		}

		navigator.clipboard.writeText(url);
		toast.success('Copied to clipboard!');
	}

	let url = $derived(urlFromID(form?.id));
</script>

<svelte:head>
	<title>boltcutter.</title>
</svelte:head>

<div class="flex h-1/3 flex-col items-center justify-around">
	<div>
		<h1 class="text-7xl font-bold text-slate-400">boltcutter.</h1>
		<p class="text-center text-lg">because querystrings make links stupid.</p>
	</div>

	<form method="POST" use:enhance>
		<label for="href" id="href" class="px-4 text-lg font-semibold">Enter a link to shorten</label>
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
			<p class="pt-2 text-center text-sm text-green-500 text-shadow">
				Success! Your link has been shortened. <button
					onclick={copyToClipboard}
					class="underline transition-colors hover:text-green-600"
					>Click to copy to clipboard.</button
				>
			</p>
		{/if}
	</form>
</div>
