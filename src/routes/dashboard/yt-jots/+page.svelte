<script lang="ts">
	import { request } from '@/network/api';
	import { userData } from '@/stores/authStore';
	import EmptyJotsView from './EmptyJotsView.svelte';
	import JotsView from './JotsView.svelte';

	export let data;

	let { folders } = data;
	// State variables
	let folderName = '';
	let selectedIcon = 'iconoir:math-book'; // Default icon

	// Create Folder Function
	async function createFolder() {
		if (!folderName) {
			alert('Please enter a folder name');
			return;
		}

		try {
			// API call to create the folder
			const newFolder = await request(
				'createFolder',
				{ folderName, icon: selectedIcon },
				{ userId: $userData.id }
			);

			// Update folders list with the newly created folder
			folders = [...folders, newFolder];

			// Clear the input after folder creation
			folderName = '';
		} catch (error) {
			console.error('Error creating folder:', error);
		}
	}
</script>

{#if folders.length < 1}
	<EmptyJotsView {folderName} {createFolder} {selectedIcon} />
{:else}
	<JotsView {folders} />
{/if}
