<script lang="ts">
	import Icon from '@iconify/svelte';
	import ProgressCircularIcon from './ProgressCircularIcon.svelte';
	import { createEventDispatcher } from 'svelte';

	export let labelText: string;
	export let items: { label: string; value: string }[] = [];
	export let selectedId: string | null = null; // Track the ID directly
	export let showProgress: boolean = false;
	export let percentage: number = 0;
	export let icon: string = 'mdi:chevron-down';
	export let iconPosition: 'start' | 'end' = 'end';
	export let isSelected: boolean = false;


	const dispatch = createEventDispatcher();

	function toggleDropdown() {
		isSelected = !isSelected;
	}

	function selectItem(item) {
		selectedId = item.value;
		isSelected = false;
		dispatch('change', selectedId);
	}
</script>

<div class="relative w-full">
	<!-- Dropdown Header -->
	<button
		type="button"
		class="inline-flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-150 px-3 py-2"
		on:click={toggleDropdown}
	>
		{#if iconPosition === 'start'}
			<span class="flex items-center gap-2">
				{#if icon}<Icon {icon} />{/if}
				<p>
					{selectedId ? items.find((item) => item.value === selectedId)?.label : labelText}
				</p>
			</span>
		{:else if iconPosition === 'end'}
			<span class="flex w-full items-center justify-between">
				<p>
					{selectedId ? items.find((item) => item.value === selectedId)?.label : labelText}
				</p>
				{#if icon}<Icon {icon} />{/if}
			</span>
		{/if}
		{#if showProgress}
			<ProgressCircularIcon {percentage} size={20} strokeWidth={3} />
		{/if}
	</button>

	<!-- Dropdown Content -->
	{#if isSelected}
		<div class="mt-2 rounded-md border border-slate-200 bg-slate-150">
			<ul class="w-full">
				{#each items as item}
					<li class="cursor-pointer px-4 py-2 hover:bg-gray-100" on:click={() => selectItem(item)}>
						{item.label}
					</li>
				{/each}
			</ul>

			<!-- "Create New Dictionary" Button -->
			<div class="mt-2 rounded-md px-1 pb-2">
				<button class="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
					<p>Create New Dictionary</p>
					<Icon icon="mdi:plus" class="h-6 w-6" />
				</button>
			</div>
		</div>
	{/if}
</div>
