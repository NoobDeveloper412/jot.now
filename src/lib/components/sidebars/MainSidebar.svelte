<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import ThemeDropdown from '../custom/ThemeDropdown.svelte';
	import FolderView from './FolderView.svelte';
	import type { Dictionary } from '@/types/dictionary';
	import { dummyDictionaries } from '../data/dummy';

	let dictionaries: Dictionary[] = dummyDictionaries;

	// State for selected items at each level
	let selectedDictionaryId: number | null = null;
	let selectedCollectionId: number | null = null;

	// Filter the collections and folders dynamically based on selected values
	function getFilteredCollections() {
		return dictionaries.find((d) => d.id === selectedDictionaryId)?.collections || [];
	}

	function getFilteredFolders() {
		return getFilteredCollections().find((c) => c.id === selectedCollectionId)?.folders || [];
	}
</script>

<Sidebar.Content class="bg-slate-50 px-4 py-2">
	<Sidebar.Group>
		<Sidebar.GroupLabel class="mb-4 flex items-center justify-center">
			<img class="h-[20px] w-[85px] md:h-8 md:w-[120px]" src="/images/Logo.svg" alt="logo" />
		</Sidebar.GroupLabel>
		<Sidebar.GroupContent>
			<Sidebar.Menu>
				<ThemeDropdown
					labelText="Dashboard"
					items={[]}
					icon={'codicon:settings'}
					showProgress={true}
				/>

				<!-- Dictionary Selection Row -->
				<div class="flex items-center space-x-1">
					<!-- Select a Dictionary Dropdown -->
					<Sidebar.MenuItem class="w-full">
						<ThemeDropdown
							labelText="Select a Dictionary"
							items={dictionaries.map((d) => ({ id: d.id, label: d.label }))}
							bind:selectedId={selectedDictionaryId}
							on:change={(event) => (selectedDictionaryId = event.detail.id)}
							icon={'uiw:down'}
							iconPosition="end"
						/>
					</Sidebar.MenuItem>
				</div>

				<div class="border border-slate-200 rounded-md">
					<!-- Collection Dropdown (conditionally rendered) -->
					{#if selectedDictionaryId}
						<Sidebar.MenuItem>
							<ThemeDropdown
								labelText="Select a Collection"
								items={getFilteredCollections().map((c) => ({ id: c.id, label: c.label }))}
								bind:selectedId={selectedCollectionId}
								on:change={(event) => (selectedCollectionId = event.detail.id)}
								icon={'uiw:down'}
								iconPosition="end"
							/>
						</Sidebar.MenuItem>
					{/if}

					<!-- Folders (using FolderView component) -->
					{#if selectedCollectionId}
						{#each getFilteredFolders() as folder}
							<FolderView folderLabel={folder.label} notes={folder.notes} />
						{/each}
					{/if}
				</div>
			</Sidebar.Menu>
		</Sidebar.GroupContent>
	</Sidebar.Group>
</Sidebar.Content>
