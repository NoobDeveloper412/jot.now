<script lang="ts">
	import { request } from '@/network/api';
	import { userData } from '@/stores/authStore';
	import { invalidate } from '$app/navigation';
	import EmptyJotsView from './EmptyJotsView.svelte';
	import JotsView from './JotsView.svelte';
	import Loader from '@/components/custom/Loader.svelte';
	import YoutubeSidebar from '@/components/sidebars/YoutubeSidebar.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index';
	export let data;

	let { folders } = data;

	let isLoading = false;

	async function fetchFolders() {
		isLoading = true;
		try {
			// Make the request
			const userId = $userData?.id;
			const response = await request('getFolders', {}, { userId });
			if (response && response.folders.length > 0) {
				await invalidate();
				folders = response.folders;
			}
		} catch (error) {
			console.error('Error:', error);
		} finally {
			isLoading = false;
		}
	}

	async function createFolder(newFolderName: string, selectedIcon: string, newFolderInfo: string) {
		isLoading = true;
		try {
			if (newFolderName.trim() && selectedIcon) {
				// Make the request
				const userId = $userData?.id;
				const response = await request(
					'createFolder',
					{ folderName: newFolderName, selectedIcon, folderInfo: newFolderInfo },
					{ userId }
				);

				console.log(response);
				if (response && response.folders.length > 0) {
					await invalidate();
					await fetchFolders();
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
		<YoutubeSidebar {folders} {createFolder} />
	</Sidebar.Provider>

	<div class="theme-scrollbar flex flex-1 flex-col p-4">
		{#if isLoading}
			<Loader />
		{:else if folders.length < 1}
			<EmptyJotsView {createFolder} />
		{:else}
			<JotsView {folders} {createFolder} />
		{/if}
	</div>
</main>
