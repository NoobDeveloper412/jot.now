<script lang="ts">
	import WordBox from '@/components/custom/WordBox.svelte';
	import DictionarySidebar from '@/components/sidebars/DictionarySidebar.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import Icon from '@iconify/svelte';
	import { writable } from 'svelte/store';
	import * as Sidebar from '$lib/components/ui/sidebar/index';
	import CollectionSidebar from '@/components/sidebars/CollectionSidebar.svelte';

	let searchQuery = '';
	let selectedLanguage = 'Khmer'; // Default selection
	let languages = ['Khmer', 'Phonetics', 'English'];
	let options = [
		{ text: 'នៅ', language: 'Khmer', phonetics: 'tve', translation: 'go', level: 1 },
		{ text: 'ឆ្លៀត', language: 'Khmer', phonetics: 'chliet', translation: 'escape', level: 2 },
		{ text: 'សូម', language: 'Khmer', phonetics: 'som', translation: 'please', level: 3 }
	];

	// Theme mapping based on difficulty level
	const levelThemeMap = {
		1: 'green',
		2: 'yellow',
		3: 'red',
		4: 'cyan',
		5: 'purple'
	};

	// Filtered results
	$: filteredOptions = options.filter((option) => {
		return (
			((selectedLanguage === 'Khmer' && option.language === 'Khmer') ||
				(selectedLanguage === 'Phonetics' && option.phonetics) ||
				(selectedLanguage === 'English' && option.translation)) &&
			option.text.includes(searchQuery)
		);
	});

	// Selected items
	const selectedItems = writable<string[]>([]);
	function toggleSelection(item: string) {
		selectedItems.update((items) => {
			if (items.includes(item)) {
				return items.filter((i) => i !== item);
			} else {
				return [...items, item];
			}
		});
	}
</script>

<main class="flex h-screen">
	<Sidebar.Provider class="max-w-[270px] bg-gray">
		<CollectionSidebar />
	</Sidebar.Provider>

	<div class="flex flex-1 flex-col bg-[#F8FAFC]">
		<div class="p-4 px-8">
			<!-- Language Filter -->
			<div class="mb-4 flex items-center space-x-4">
				{#each languages as lang}
					<button on:click={() => (selectedLanguage = lang)}>
						<p
							class={`text-medium text-sm ${selectedLanguage === lang ? 'text-blue-500' : 'text-stone-200'}`}
						>
							{lang}
						</p>
					</button>
				{/each}
			</div>

			<div class="relative mb-4">
				<Input
					type="text"
					placeholder="Search dictionaries..."
					class="h-8 w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-xs placeholder:text-stone-200 focus:outline-none focus:ring-transparent"
					bind:value={searchQuery}
				/>
				<Icon
					icon="mdi:search"
					class="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 transform text-primary"
				/>
			</div>

			<!-- Results -->
			<div>
				<p class="mb-2 text-sm font-semibold text-slate-600">Search Results</p>
				<div class="flex flex-wrap gap-2">
					{#each options as option}
						<WordBox
							text={selectedLanguage === 'Khmer'
								? option.text
								: selectedLanguage === 'Phonetics'
									? option.phonetics
									: option.translation}
							theme={levelThemeMap[option.level]}
							isSelected={$selectedItems.includes(option.text)}
							onClick={(text) => toggleSelection(text)}
							classes={`hover:bg-opacity-80 ${selectedLanguage === 'Khmer' ? 'font-openKhmer font-bold' : ''}`}
						/>
					{/each}
				</div>
			</div>
		</div>
	</div>
</main>
