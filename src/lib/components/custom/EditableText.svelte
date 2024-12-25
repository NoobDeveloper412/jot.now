<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';

	export let text: string;
	export let isEditing: boolean = false;
	export let textClass: string = ''; // Custom classes for the text
	export let toolTipText: string = 'Double click to edit!'; // Default tooltip text

	const dispatch = createEventDispatcher();

	let inputRef: HTMLInputElement;

	function enableEditing() {
		isEditing = true;
		$: nextTick(() => inputRef.focus());
	}

	function handleBlur() {
		isEditing = false;
		dispatch('update', inputRef.value);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleBlur();
		} else if (event.key === 'Escape') {
			isEditing = false;
		}
	}
</script>

{#if isEditing}
	<input
		bind:this={inputRef}
		value={text}
		on:blur={handleBlur}
		on:keydown={handleKeydown}
		class="bg-background placeholder:text-muted-foreground flex h-7 w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none"
	/>
{:else}
	<Tooltip.Provider delayDuration={300}>
		<Tooltip.Root>
			<Tooltip.Trigger>
				<p on:dblclick={enableEditing} class={textClass}>{text}</p>
			</Tooltip.Trigger>
			<Tooltip.Content class="rounded bg-white p-2 shadow">
				<p class="text-xs">{toolTipText}</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
{/if}
