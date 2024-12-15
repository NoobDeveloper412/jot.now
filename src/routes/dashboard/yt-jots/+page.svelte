<script lang="ts">
	import Button from '@/components/ui/button/button.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import { request } from '@/network/api';
	import Icon from '@iconify/svelte';
	import { userData } from '@/stores/authStore';

	// Props passed from +page.server.ts
	export let data;

	let { folders } = data;
	// State variables
	let folderName = ''; // Folder name input
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
			alert('Failed to create folder');
		}
	}
</script>

<div class="m-3 flex flex-col items-center border border-2 border-[#F2F4F7] py-20">
	<div class="text-center">
		<h4 class="text-4xl font-medium leading-[44px]">Create a folder for your notes.</h4>
		<p class="my-4 mt-2 text-lg leading-8">Choose an icon and name your folder.</p>
	</div>

	<div class="flex items-center justify-center gap-3">
		<span class="rounded-lg bg-[#F2F4F7] p-2">
			<Icon icon={selectedIcon} class="h-6 w-6" />
		</span>
		<Input
			type="text"
			bind:value={folderName}
			placeholder="Folder Name"
			class="rounded-md border border-[#E0E0E0] px-4 py-2"
		/>

		<Button
			onclick={createFolder}
			class="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
		>
			Create Folder
		</Button>
	</div>

	<!-- Display Created Folders -->
	<div class="mt-10">
		<h5 class="text-2xl font-medium">Your Folders</h5>
		{#if folders.length > 0}
			<div class="mt-4 grid grid-cols-3 gap-4">
				{#each folders as folder}
					<div class="flex items-center gap-2 rounded-lg border border-[#F2F4F7] p-4">
						<Icon icon={folder.icon || 'iconoir:folder'} class="h-8 w-8 text-blue-600" />
						<span class="text-lg font-medium">{folder.folderName}</span>
					</div>
				{/each}
			</div>
		{:else}
			<p class="mt-4 text-gray-500">No folders available. Create one now!</p>
		{/if}
	</div>
</div>
