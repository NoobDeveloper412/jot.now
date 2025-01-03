<script lang="ts">
	import Icon from '@iconify/svelte';
	import ProgressCircularIcon from './ProgressCircularIcon.svelte';
	import Input from '../ui/input/input.svelte';
	import NestedSubItem from './NestedSubItem.svelte';

	export let collection: any = [];
	export let type: 'folder' | 'note' = 'folder';
	export let showProgress: boolean = false;
	export let percentage: number = 0;
	export let icon: string = 'mdi:chevron-down';
	export let iconPosition: 'start' | 'end' = 'end';

	console.log(collection);
	let isOpen = false;
	let searchQuery = '';

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	// $: filteredItems =
	// 	type === 'note' && searchQuery
	// 		? items[0].filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
	// 		: items[0];

	// 		console.log(filteredItems)
</script>

<div class="nested-collapsible">
	<!-- Collapsible Header -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="header flex cursor-pointer items-center justify-between rounded-md border border-slate-200 bg-slate-100 px-3 py-2"
		on:click={toggleDropdown}
	>
		<span class="flex items-center gap-2">
			<Icon {icon} />
			<span class="text-sm font-semibold">{collection.label}</span>
		</span>
		{#if showProgress}
			<ProgressCircularIcon {percentage} size={20} strokeWidth={3} />
		{/if}
	</div>

	<!-- Collapsible Content -->
	{#if isOpen}
		<div class="content ml-2 mt-2">
			{#if type === 'note'}
				<!-- Search Bar for Notes -->
				<Input
					type="text"
					bind:value={searchQuery}
					placeholder="Search jots..."
					class="mb-2 w-full"
				/>
			{/if}

			<!-- Render Sub-Items -->
			<!-- <NestedSubItem items={i} /> -->
		</div>
	{/if}
	<!-- Subfolders (using FolderView component) -->
	<!-- {#if selectedFolderId}
	{#each getFilteredSubfolders() as subfolder}
		<FolderView folderLabel={subfolder.title} notes={subfolder.words} />
	{/each}
{/if} -->
</div>

<style>
	.nested-collapsible {
		margin-bottom: 1rem;
	}
</style>
