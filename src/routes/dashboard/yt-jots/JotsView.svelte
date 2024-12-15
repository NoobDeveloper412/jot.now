<script lang="ts">
	import { goto } from '$app/navigation';
	import IconPicker from '@/components/custom/IconPicker.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import Input from '@/components/ui/input/input.svelte';

	export let folders: { id: number; name: string; icon: string }[] = [];
	let selectedIcon = 'mdi:home';

	let newFolderName = '';
	let newFolderInfo = '';

	function addFolder() {
		if (newFolderName.trim() && selectedIcon) {
			const newFolder = {
				id: folders.length + 1,
				name: newFolderName,
				icon: selectedIcon
			};
			folders = [...folders, newFolder];
			newFolderName = '';
			selectedIcon = '';
		}
	}
</script>

<div class="m-3">
	<p class="text-tertiary text-sm">Folders</p>

	<div class="mb-4 mt-3 flex w-max items-center justify-start space-x-2">
		<Input bind:value={newFolderName} placeholder="Folder Name" class="placeholder-[#97A1AF]" />
		<Input bind:value={newFolderInfo} placeholder="Folder Info" class="placeholder-[#97A1AF]" />
		<span class="rounded-lg bg-[#F2F4F7] p-2">
			<!-- <IconPicker bind:selectedIcon /> -->
		</span>
		<Button onclick={addFolder} class="rounded-lg bg-primary-500 px-6 py-3 text-white"
			>Add Folder</Button
		>
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each folders as folder}
			<div
				class="flex cursor-pointer items-center rounded-xl border border-gray-200 p-4 px-6 shadow-sm"
			>
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div on:click={goto(`/dashboard/yt-jots/folders/${folder._id}`)}>
					<p class="text-sm font-bold">{folder.folderName}</p>
					<p class="text-tertiary text-xs">Breme</p>

					<p class="text-tertiary mt-1 text-xs">2 Video Notes</p>
				</div>
			</div>
		{/each}
	</div>
</div>
