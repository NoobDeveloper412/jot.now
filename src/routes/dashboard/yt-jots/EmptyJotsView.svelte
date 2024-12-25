<script lang="ts">
	import IconPicker from '@/components/custom/IconPicker.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import Input from '@/components/ui/input/input.svelte';

	export let createFolder;

	let newFolderName = '';
	let selectedIcon = 'iconoir:math-book';
</script>

<div class="m-3 flex flex-col items-center border border-2 border-[#F2F4F7] py-20">
	<div class="text-center">
		<h4 class="text-4xl font-medium leading-[44px]">Create a folder for your notes.</h4>
		<p class="my-4 mt-2 text-lg leading-8">Choose an icon and name your folder.</p>
	</div>

	<div class="flex items-center justify-center gap-3">
		<span class="rounded-lg bg-[#F2F4F7] p-2">
			<IconPicker bind:selectedIcon />
		</span>
		<Input
			type="text"
			bind:value={newFolderName}
			placeholder="Folder Name"
			class="rounded-md border border-[#E0E0E0] px-4 py-2"
		/>

		<Button
			onclick={() => createFolder(newFolderName, selectedIcon, '')}
			class="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-primary"
		>
			Create Folder
		</Button>
	</div>
</div>
