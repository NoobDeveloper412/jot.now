<script lang="ts">
	import Icon from '@iconify/svelte';
	import NestedCollapsible from './NestedCollapsible.svelte';
	import Input from '../ui/input/input.svelte'; // Adjust the import based on your project
	import { Title } from '../ui/dialog';

	export let items: any[] = [];
	export let type: 'folder' | 'word' = 'folder';

	let searchQuery = '';

	// Filtered items based on the search query
	$: filteredItems =
		type === 'word' && searchQuery
			? items.filter(
					(item) =>
						item.sourceWord.toLowerCase().includes(searchQuery.toLowerCase()) ||
						item.targetWord.toLowerCase().includes(searchQuery.toLowerCase())
				)
			: items;
</script>

<div class="relative mt-1 space-y-[2px] pl-[11px]">
	{#if type === 'word'}
		<!-- Search Bar for Notes -->
		<div class="relative mb-2">
			<Input
				type="text"
				bind:value={searchQuery}
				placeholder={`Search notes...`}
				class="h-8 w-full rounded-lg border border-none border-slate-300 px-2 py-1 text-xs placeholder:text-xs focus:outline-none"
			/>
			<Icon
				icon="mdi:search"
				class="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 transform text-primary"
			/>
		</div>
		<hr class="my-2 text-[#E4E7EC]" />
	{/if}

	<ul>
		{#each filteredItems as item}
			<li class="relative mt-1 space-y-[2px]">
				{#if type === 'folder'}
					<NestedCollapsible folder={item} />
				{:else if type === 'word'}
					<div
						class="mt-1 flex cursor-pointer items-center justify-start gap-2 rounded-lg bg-white px-1 py-2 hover:bg-slate-50"
					>
						<Icon icon={'mdi-light:file'} />
						<p class="flex items-center justify-center">
							<span>{item.sourceWord}</span>
							<span class="text-gray-500">-</span>
							<span>{item.targetWord}</span>
						</p>
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</div>
