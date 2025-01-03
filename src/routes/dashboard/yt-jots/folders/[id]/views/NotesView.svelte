<script lang="ts">
	import Button from '@/components/ui/button/button.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import { navigateTo } from '@/utils';
	import Icon from '@iconify/svelte';

	export let notes: {
		id: number;
		name: string;
		icon: string;
		description: string;
		url: string;
		thumbnail?: string;
	}[] = [];
	let selectedIcon = 'mdi:file-document';
	export let createNote;

	let newNoteName = '';
	let description = '';
	let url = '';

	let searchQuery = '';
	let currentPage = 1;
	const itemsPerPage = 8;

	$: filteredNotes = notes.filter(
		(note) =>
			note.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			(note.description && note.description.toLowerCase().includes(searchQuery.toLowerCase()))
	);

	// Paginate the filtered notes
	$: totalPages = Math.ceil(filteredNotes.length / itemsPerPage);
	$: paginatedNotes = filteredNotes.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	function changePage(page: number) {
		if (page > 0 && page <= totalPages) {
			currentPage = page;
		}
	}

	function getVideoThumbnail(videoUrl: string): string {
		console.log(videoUrl);
		try {
			const url = new URL(videoUrl);

			if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
				const videoId =
					url.hostname === 'youtu.be' ? url.pathname.substring(1) : url.searchParams.get('v');

				if (videoId) {
					console.log(videoId);
					return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
				}
			}
		} catch (e) {
			console.error('Invalid URL:', videoUrl);
		}
		return 'https://fakeimg.pl/600x400';
	}
</script>

<div class="m-3">
	<p class="text-tertiary text-sm">Video Notes</p>

	<div class="flex items-center justify-between">
		<div class="mb-4 mt-3 flex w-max items-center justify-start space-x-2">
			<Input
				bind:value={newNoteName}
				placeholder="Title"
				class="theme-shadow w-[11rem] rounded-lg border border-gray-700 px-5 py-2 pr-10 placeholder-[#97A1AF]"
			/>
			<Input
				bind:value={description}
				placeholder="Description"
				class="theme-shadow w-[11rem] rounded-lg border border-gray-700 px-5 py-2 pr-10 placeholder-[#97A1AF]"
			/>
			<Input
				bind:value={url}
				placeholder="URL"
				class="theme-shadow w-[11rem] rounded-lg border border-gray-700 px-5 py-2 pr-10 placeholder-[#97A1AF]"
			/>
			<Button
				onclick={() => createNote(newNoteName, url, '', description)}
				class="rounded-lg bg-primary-500 px-6 py-3 text-white">Add Note</Button
			>
		</div>
		<div class="relative">
			<Input
				type="text"
				placeholder="Search for notes..."
				class="w-full w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-transparent"
				bind:value={searchQuery}
			/>
			<Icon
				icon="mdi:search"
				class="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 transform text-primary"
			/>
		</div>
	</div>

	<div class="grid-container">
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{#each paginatedNotes as note}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					on:click={() => navigateTo('notes', note._id)}
					class="theme-shadow flex cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-700"
				>
					<img
						src={note.thumbnail || getVideoThumbnail(note.videoLink)}
						alt={note.name}
						class="h-48 w-full object-cover"
					/>
					<div class="p-4">
						<p class="text-sm font-bold text-[#344051]">{note.name}</p>
						<p class="text-sm text-[#97A1AF]">{note.description || 'No Description'}</p>
						<p class="mt-4 text-sm font-medium text-[#344051]">{note.jots.length || 0} Jots</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Pagination Controls -->
	<div class="pagination-controls">
		<Button
			onclick={() => changePage(currentPage - 1)}
			disabled={currentPage === 1}
			class="bg-[#F9FAFB] text-gray-400 hover:bg-primary hover:text-white"
		>
			<Icon icon="mdi:chevron-left" class="h-6 w-6" />
		</Button>
		<span class="flex items-center px-4">Page {currentPage} of {totalPages}</span>
		<Button
			onclick={() => changePage(currentPage + 1)}
			disabled={currentPage === totalPages}
			class="bg-[#F9FAFB] text-gray-400 hover:bg-primary hover:text-white"
		>
			<Icon icon="mdi:chevron-right" class="h-6 w-6" />
		</Button>
	</div>
</div>

<style>
	.grid-container {
		min-height: 600px; /* Adjust based on your grid's typical height */
	}

	.pagination-controls {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin-top: 1rem;
		margin-bottom: 1rem;
		position: relative;
	}
</style>
