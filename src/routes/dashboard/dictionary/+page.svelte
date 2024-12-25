<script lang="ts">
	import { getFileUrl } from '@/utils';
	import AddDictionaryModal from './modals/AddDictionaryModal.svelte';
	import _ from 'lodash';
	import Input from '@/components/ui/input/input.svelte';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import * as Sidebar from '$lib/components/ui/sidebar/index';
	import DictionarySidebar from '@/components/sidebars/DictionarySidebar.svelte';
	import MainSidebar from '@/components/sidebars/MainSidebar.svelte';

	const { debounce } = _;

	export let data;

	let { dictionaries } = data || {};
	let searchQuery = '';
	let filteredDictionaries = dictionaries;

	// Debounced search function
	const debouncedSearch = debounce((query: string) => {
		if (query.trim() === '') {
			filteredDictionaries = dictionaries;
		} else {
			filteredDictionaries = dictionaries.filter((dictionary) =>
				`${dictionary.sourceLanguage} ${dictionary.targetLanguage}`
					.toLowerCase()
					.includes(query.toLowerCase())
			);
		}
	}, 300);

	// Handle search input change
	function handleSearch(event: Event) {
		const input = event.target as HTMLInputElement;
		searchQuery = input.value;
		debouncedSearch(searchQuery);
	}
</script>

<main class="flex h-screen">
	<Sidebar.Provider class="max-w-[270px] bg-gray">
		<MainSidebar />
	</Sidebar.Provider>

	<div class="flex flex-1 flex-col bg-[#F8FAFC] p-6">
		<div class="relative mb-4">
			<Input
				type="text"
				placeholder="Search dictionaries..."
				class="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none  focus:ring-transparent"
				bind:value={searchQuery}
				oninput={handleSearch}
			/>
			<Icon
				icon="mdi:search"
				class="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 transform text-primary"
			/>
		</div>
		<h1 class="mb-4 text-2xl font-semibold">Your Dictionaries</h1>

		{#if filteredDictionaries && filteredDictionaries.length > 0}
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{#each filteredDictionaries as dictionary (dictionary._id)}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="cursor-pointer bg-white shadow transition hover:shadow-md"
						on:click={() => goto(`dictionary/${dictionary._id}`)}
					>
						<img
							src={getFileUrl(dictionary.thumbnail) || 'https://via.placeholder.com/150'}
							alt={dictionary.sourceLanguage}
							class="mb-2 h-32 w-full object-cover"
						/>
						<h2 class="px-4 pt-3 text-lg font-bold">
							{dictionary.sourceLanguage} - {dictionary.targetLanguage}
						</h2>
						<p class="px-4 pb-3 text-sm text-gray-600">
							{dictionary.subtitle || 'No subtitle provided'}
						</p>
					</div>
				{/each}
			</div>
		{:else}
			<div class="text-center">
				<p class="mb-4 text-gray-600">No dictionaries match your search!</p>
				<AddDictionaryModal />
			</div>
		{/if}
	</div>
</main>
