<script lang="ts">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import ProgressCircularIcon from './ProgressCircularIcon.svelte';
	import Icon from '@iconify/svelte';

	export let labelText: string;
	export let items: { id: number; label: string }[] = [];
	export let selectedId: number | null = null;
	export let icon: string | null = null;
	export let showProgress: boolean | null = false;
	export let iconPosition: 'start' | 'end' | 'null' = 'start';

	const dispatch = createEventDispatcher();
	let dropdownOpen = false;
	let dropdownRef: HTMLElement;

	function handleSelect(itemId: number) {
		selectedId = itemId;
		dropdownOpen = false;
		dispatch('change', { id: itemId });
	}

	function handleClickOutside(event: MouseEvent) {
		if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
			dropdownOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div class="relative text-left" bind:this={dropdownRef}>
	<button
		type="button"
		class="bg-slate-150 inline-flex w-full items-center justify-between  border border-slate-200 px-3 py-2"
		aria-haspopup="true"
		aria-expanded={dropdownOpen}
		on:click={() => (dropdownOpen = !dropdownOpen)}
	>
		{#if iconPosition === 'start'}
			<span class="flex items-center gap-2">
				{#if icon}<Icon {icon} />{/if}
				<p>
					{selectedId ? items.find((item) => item.id === selectedId)?.label : labelText}
				</p>
			</span>
		{:else if iconPosition === 'end'}
			<span class="flex w-full items-center justify-between">
				<p>
					{selectedId ? items.find((item) => item.id === selectedId)?.label : labelText}
				</p>
				{#if icon}<Icon {icon} />{/if}
			</span>
		{/if}
		{#if showProgress}
			<ProgressCircularIcon percentage={75} size={12} strokeWidth={2} />
		{/if}
	</button>

	{#if dropdownOpen}
		<div
			class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="menu-button"
			tabindex="-1"
		>
			<div class="py-1" role="none">
				{#each items as item}
					<a
						href="#"
						class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						role="menuitem"
						tabindex="-1"
						on:click|preventDefault={() => handleSelect(item.id)}
					>
						{item.label}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</div>
