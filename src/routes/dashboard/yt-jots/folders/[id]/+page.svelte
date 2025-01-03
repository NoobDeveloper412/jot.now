<script lang="ts">
	import { request } from '@/network/api';
	import { userData } from '@/stores/authStore';
	import { invalidate } from '$app/navigation';
	import Loader from '@/components/custom/Loader.svelte';
	import YoutubeSidebar from '@/components/sidebars/YoutubeSidebar.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index';
	import EmptyNotesView from './views/EmptyNotesView.svelte';
	import NotesView from './views/NotesView.svelte';

	export let data;
	let { folder } = data;

	let notes = folder.notes;

	let isLoading = false;

	async function fetchFolder() {
		isLoading = true;
		try {
			// Make the request
			const userId = $userData?.id;
			const response = await request('getFolderById', { folderId: folder._id }, { userId });
			console.log(response);
			if (response && response.folder.notes.length > 0) {
				await invalidate();
				notes = response.folder.notes;
			}
		} catch (error) {
			console.error('Error:', error);
		} finally {
			isLoading = false;
		}
	}

	async function createNote(
		newNoteName: string,
		videoLink: string,
		thumbnail: string,
		description: string
	) {
		isLoading = true;
		try {
			if (newNoteName.trim() && videoLink) {
				const userId = $userData?.id;
				const response = await request(
					'addVideoNote',
					{ name: newNoteName, videoLink, thumbnail, description, folderId: folder._id },
					{ userId }
				);
				console.log(response);
				if (response && response.folders.length > 0) {
					await invalidate();
					await fetchFolder();
				}
			}
		} catch (error) {
			console.error('Error:', error);
		} finally {
			isLoading = false;
		}
	}
</script>

<main class="flex h-screen">
	<Sidebar.Provider class="sticky top-0 h-full max-w-[270px] bg-gray">
		<YoutubeSidebar {notes} createItem={createNote} />
	</Sidebar.Provider>

	<div class="theme-scrollbar flex flex-1 flex-col p-4">
		{#if isLoading}
			<Loader />
		{:else if folder.notes.length < 1}
			<EmptyNotesView {createNote} />
		{:else}
			<NotesView {createNote} {notes} />
		{/if}
	</div>
</main>
