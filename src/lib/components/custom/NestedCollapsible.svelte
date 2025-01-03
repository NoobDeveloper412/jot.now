<script lang="ts">
	import Icon from '@iconify/svelte';
	import ProgressCircularIcon from './ProgressCircularIcon.svelte';
	import NestedSubItem from './NestedSubItem.svelte';

	export let folder: any = [];
	export let showProgress: boolean = false;
	export let percentage: number = 0;
	export let icon: string = 'mdi:chevron-down';
	export let iconPosition: 'start' | 'end' = 'end';

	let isOpen = false;

	function toggleDropdown() {
		isOpen = !isOpen;
	}
</script>

<div class="nested-collapsible relative">
	<!-- Collapsible Header -->
	<div
		class="header flex cursor-pointer items-center justify-between border-b border-slate-200 bg-slate-100 py-2 pl-3"
		on:click={toggleDropdown}
	>
		<span class="flex items-center gap-2">
			<Icon icon={folder.icon || icon} />
			<p class="font-semibold">{folder.title}</p>
		</span>
		{#if showProgress}
			<ProgressCircularIcon {percentage} size={20} strokeWidth={3} />
		{/if}
	</div>

	<!-- Collapsible Content -->
	{#if isOpen}
		<div class="content">
			{#if folder.subfolders && folder.subfolders.length > 0}
				<NestedSubItem items={folder.subfolders} />
			{/if}
			{#if folder.words && folder.words.length > 0}
				<NestedSubItem items={folder.words} type="word" />
			{/if}
		</div>
	{/if}
</div>

<style>
	.nested-collapsible::before {
		content: '';
		position: absolute;
		left: 0px;
		top: 0;
		bottom: 0;
		width: 1px;
		background-color: #cbd5e1;
		z-index: 1;
	}
	.header {
		z-index: 2;
		position: relative;
	}
</style>
