<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import ThemeDropdown from '../custom/ThemeDropdown.svelte';
	import FolderView from './FolderView.svelte';
	import type { Dictionary } from '@/types/dictionary';
	import { dummyDictionaries } from '../data/dummy';
	import { goto } from '$app/navigation';
	import SidebarCollapsible from '../custom/SidebarCollapsible.svelte';
	import NestedCollapsible from '../custom/NestedCollapsible.svelte';

	let dictionaries: Dictionary[] = dummyDictionaries;
	let dictionarySelect: boolean = false;

	// State for selected items at each level
	let selectedDictionaryId: number | null = null;
	let selectedFolderId: number | null = null;
	let selectedDictionary: Dictionary = [];


	// Get the selected dictionary
	function getSelectedDictionary() {
		return dictionaries.find((d) => d.id === selectedDictionaryId) || null;
	}
	

	// Filter the folders dynamically based on selected values
	// function getFilteredFolders() {
	// 	selectedDictionary = getSelectedDictionary();
	// 	return selectedDictionary ? selectedDictionary.folders : [];
	// }
</script>

<Sidebar.Content class="bg-gray px-4 py-2">
	<Sidebar.Group>
		<Sidebar.GroupLabel
			class="mb-4 flex cursor-pointer items-center justify-center"
			onclick={() => goto('/dashboard')}
		>
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
					<SidebarCollapsible
						labelText="Select Dictionary"
						items={dictionaries.map((d) => ({
							id: d.id,
							label: `${d.sourceLanguage} - ${d.targetLanguage}`,
							value: d.id
						}))}
						percentage={75}
						bind:selectedId={selectedDictionaryId}
						bind:dictionarySelect
					/>
				</div>

				<div class="rounded-md border border-slate-200">
					<!-- Folder Dropdowns (conditionally rendered) -->
					<!-- {#if selectedDictionaryId}
						<NestedCollapsible
							items={selectedDictionary}
							type="folder"
							bind:selectedId={selectedFolderId}
						/>
					{/if} -->
				</div>
			</Sidebar.Menu>
		</Sidebar.GroupContent>
	</Sidebar.Group>
</Sidebar.Content>
