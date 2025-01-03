<script lang="ts">
	import IconPicker from '@/components/custom/IconPicker.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import { navigateTo } from '@/utils';

	export let folders: { id: number; folderName: string; icon: string; folderInfo: string }[] = [];
	let selectedIcon = 'mdi:home';
	export let createFolder;

	let newFolderName = '';
	let newFolderInfo = '';
</script>

<div class="m-3">
	<p class="text-tertiary text-sm">Folders</p>

	<div class="mb-4 mt-3 flex w-max items-center justify-start space-x-2">
		<Input bind:value={newFolderName} placeholder="Folder Name" class="placeholder-[#97A1AF]" />
		<Input bind:value={newFolderInfo} placeholder="Folder Info" class="placeholder-[#97A1AF]" />
		<div class="rounded-lg bg-[#F2F4F7] p-2">
			<IconPicker bind:selectedIcon />
		</div>
		<Button
			onclick={() => createFolder(newFolderName, selectedIcon, newFolderInfo)}
			class="rounded-lg bg-primary-500 px-6 py-3 text-white">Add Folder</Button
		>
	</div>
	

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each folders as folder}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				on:click={() => navigateTo('folders', folder._id)}
				class="flex cursor-pointer items-center rounded-xl border border-gray-200 p-4 px-6 shadow-sm"
			>
				<div>
					<p class="text-sm font-bold">{folder.folderName}</p>
					<p class="text-tertiary text-xs">{folder.folderInfo || 'No Info'}</p>

					<p class="text-tertiary mt-1 text-xs">{folder.notes.length || 'No'} Video Notes</p>
				</div>
			</div>
		{/each}
	</div>
</div>
