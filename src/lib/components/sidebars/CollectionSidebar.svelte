<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Button from '@/components/ui/button/button.svelte';
	import Icon from '@iconify/svelte';
	import _ from 'lodash';
	import EditableText from '../custom/EditableText.svelte';
	const { debounce } = _;

	let dictionary = {
		imageUrl: '/images/sample-dictionary.jpg',
		name: 'Sample Collection',
		collections: [
			{ id: 1, name: 'Folder 1' },
			{ id: 2, name: 'Folder 2' },
			{ id: 3, name: 'Folder 3' },
			{ id: 4, name: 'Folder 4' }
		]
	};

	// Debounced functions for updating
	const debouncedUpdateDictionaryName = debounce((newName: string) => {
		console.log('Updated dictionary name:', newName);
		dictionary.name = newName;
	}, 300);

	const debouncedUpdateCollectionName = debounce((id: number, newName: string) => {
		console.log('Updated collection name:', id, newName);
		const collection = dictionary.collections.find((col) => col.id === id);
		if (collection) collection.name = newName;
	}, 300);
</script>

<Sidebar.Content class="w-64 bg-gray px-3 py-3">
	<Sidebar.Group>
		<div class="flex items-center justify-between">
			<Sidebar.GroupLabel>
				<p class="text-sm font-medium">Collection Image</p>
			</Sidebar.GroupLabel>
			<div class="flex items-center">
				<Icon icon="material-symbols:upload-file-outline-rounded" class="h-5 w-5 text-slate-600" />
				<Icon icon="mdi:trash-can-outline" class="h-5 w-5 text-slate-600" />
			</div>
		</div>
		<div
			class="mb-3 flex items-center justify-center border border-dashed border-slate-300 bg-white py-5"
		>
			<img src={'https://placehold.co/96/jpeg'} alt="dictionary_thumbnail" class="" />
		</div>

		<Sidebar.GroupLabel>
			<p class="text-sm font-bold">Collection Name</p>
		</Sidebar.GroupLabel>

		<div class="flex flex-col gap-2">
			<EditableText
				text={dictionary.name}
				textClass="flex px-4 bg-white py-2 text-slate-600 font-semibold text-sm rounded-lg"
				on:update={(e) => debouncedUpdateDictionaryName(e.detail)}
			/>
			<EditableText
				text={dictionary.name}
				textClass="flex px-4 bg-white py-2 text-slate-600 font-semibold text-sm rounded-lg"
				on:update={(e) => debouncedUpdateDictionaryName(e.detail)}
			/>
		</div>

		<Sidebar.GroupLabel class="mt-2">
			<p class="text-sm font-bold">Folders</p>
		</Sidebar.GroupLabel>
		<div class="space-y-2">
			{#each dictionary.collections as collection}
				<div class="flex items-center justify-between rounded-lg bg-white px-4 py-1">
					<div class="flex items-center space-x-2">
						<Icon icon="uiw:folder" class="text-blue-500" />
						<EditableText
							text={collection.name}
							on:update={(e) => debouncedUpdateCollectionName(collection.id, e.detail)}
						/>
					</div>
					<Button size="sm" variant="link">
						<Icon icon="mdi:drag" class="h-5 w-5 text-primary" />
					</Button>
				</div>
			{/each}
		</div>
	</Sidebar.Group>
</Sidebar.Content>
