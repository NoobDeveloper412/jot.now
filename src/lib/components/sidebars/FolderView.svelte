<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import NoteView from './NoteView.svelte';
	import Icon from '@iconify/svelte'; // Import Icon component
	import type { Note } from '@/types/dictionary';

	export let folderLabel: string;
	export let notes: Note[];

	let expanded = false;
	const dispatch = createEventDispatcher();

	function toggleExpand() {
		expanded = !expanded;
	}
</script>

<div class="folder-view">
	<!-- Folder Header -->
	<div
		class="flex cursor-pointer items-center justify-between border border-slate-200 bg-gray p-2"
		on:click={toggleExpand}
	>
		<!-- Folder Icon -->
		<div class="flex items-center gap-2">
			<Icon icon="uiw:folder" class={expanded ? 'text-blue-500' : 'text-gray-700'} />
			<p class="textfont-semibold">{folderLabel}</p>
		</div>
		<!-- Expand/Collapse Icon -->
		<Icon icon={`${expanded ? 'ic:baseline-minus' : 'ic:baseline-plus'}`}  class="text-gray-700 mr-1"/>
	</div>

	<!-- Folder Content -->
	{#if expanded}
		<div class="pl-4">
			{#each notes as note}
				<div class="note-item bg-[#F8FAFC]">
					<!-- Note Header -->
					<div
						class="flex cursor-pointer items-center justify-between p-2"
						on:click={() => dispatch('noteSelected', { noteId: note.id })}
					>
						<p class="flex items-center justify-center gap-1">
							<Icon icon="line-md:file" />
							<span>{note.label}</span>
						</p>
					</div>

					<!-- Note Content -->
					<NoteView {note} />
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	.folder-view:last-child {
		@apply rounded-b-md;
	}
	.note-item {
		border-left: 2px solid #ccc;
		padding-left: 0.5rem;
	}
</style>
