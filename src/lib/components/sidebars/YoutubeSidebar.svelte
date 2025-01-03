<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { navigateTo } from '@/utils';
	import Input from '../ui/input/input.svelte';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	export let folders = [];
	export let notes = [];
	export let createItem;

	let newFolderName = '';
	let searchQuery = '';

	// Filter logic for folders or notes
	$: filteredFolders = folders?.filter((folder) =>
		folder.folderName.toLowerCase().includes(searchQuery.toLowerCase())
	);

	$: filteredNotes = notes?.filter((note) =>
		note.name.toLowerCase().includes(searchQuery.toLowerCase())
	);
</script>

<Sidebar.Content class="border border-2 border-l-[#E4E7EC] bg-white px-4 py-2">
	<Sidebar.Group>
		<Sidebar.GroupLabel class="flex items-center justify-center cursor-pointer" onclick={() => goto('/dashboard')}>
			<img class="h-[20px] w-[85px] md:h-8 md:w-[120px]" src="/images/Logo.svg" alt="logo" />
		</Sidebar.GroupLabel>
		<hr class="my-2 text-[#E4E7EC]" />
		<Sidebar.GroupContent>
			<Sidebar.Menu>
				<!-- Add Folder Input -->
				{#if folders.length > 0}
					<div class="relative">
						<Input
							id="addFolder"
							placeholder="Add folder"
							bind:value={newFolderName}
							class="theme-input pr-10"
						/>
						<Icon
							icon="iconamoon:folder-add"
							onclick={() => createItem(newFolderName, 'mdi:files', '')}
							class="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 transform cursor-pointer text-[#97A1AF]"
						/>
					</div>
				{/if}

				<!-- Add Note Input -->
				{#if notes.length > 0}
					<div class="relative">
						<Input
							id="addNote"
							placeholder="Add note"
							bind:value={newFolderName}
							class="theme-input pr-10"
						/>
						<Icon
							icon="mdi:note-plus"
							onclick={() => createItem(newFolderName, 'mdi:note', '')}
							class="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 transform cursor-pointer text-[#97A1AF]"
						/>
					</div>
				{/if}

				<hr class="my-1" />

				<!-- Search Bar -->
				<div class="relative">
					<Input
						id="search"
						placeholder="Search..."
						bind:value={searchQuery}
						class="theme-input pr-10"
					/>
					<Icon
						icon="mdi:search"
						class="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 transform text-[#97A1AF]"
					/>
				</div>

				<!-- Render folders if passed -->
				{#if folders.length > 0}
					<ul class="space-y-2">
						{#each filteredFolders as folder}
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
							<li
								class="flex cursor-pointer items-center justify-between py-2 hover:bg-[#F9FAFB]"
								on:click={() => navigateTo('folders', folder._id)}
							>
								<div class="flex items-center space-x-2">
									<Icon icon={folder.icon || 'iconoir:folder'} class="h-5 w-5 text-[#97A1AF]" />
									<span class="text-sm font-[400] text-[#344051]">{folder.folderName}</span>
								</div>
								<span class="flex items-center">
									<Icon icon="mdi:chevron-right" class="h-5 w-5 text-gray-400" />
								</span>
							</li>
						{/each}
					</ul>
				{/if}

				<!-- Render notes if passed -->
				{#if notes.length > 0}
					<ul class="space-y-2">
						{#each filteredNotes as note}
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
							<li
								class="flex cursor-pointer items-center justify-between py-2 hover:bg-[#F9FAFB]"
								on:click={() => navigateTo('notes', note._id)}
							>
								<div class="flex items-center space-x-2 px-2">
									<Icon icon="ph:file-video-fill" class="h-5 w-5 text-[#97A1AF]" />
									<span class="text-sm font-[400] text-[#344051]">{note.name}</span>
								</div>
								<span class="flex items-center">
									<Icon icon="mdi:chevron-right" class="h-5 w-5 text-gray-400" />
								</span>
							</li>
						{/each}
					</ul>
				{/if}
			</Sidebar.Menu>
		</Sidebar.GroupContent>
	</Sidebar.Group>
</Sidebar.Content>
