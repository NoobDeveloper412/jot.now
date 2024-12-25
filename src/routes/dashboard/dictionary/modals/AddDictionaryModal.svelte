<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import Input from '@/components/ui/input/input.svelte';
	import Label from '@/components/ui/label/label.svelte';
	import { request } from '@/network/api';
	import { userData } from '@/stores/authStore';

	let isDialogOpen = false;

	// Data model for creating a dictionary
	let dictionaryData = {
		sourceLanguage: '',
		sourcePhonetics: '',
		targetLanguage: '',
		thumbnail: null // File object for the uploaded thumbnail
	};

	// Function to handle form submission
	async function createDictionary() {
		try {
			const formData = new FormData();
			formData.append('sourceLanguage', dictionaryData.sourceLanguage);
			formData.append('sourcePhonetics', dictionaryData.sourcePhonetics);
			formData.append('targetLanguage', dictionaryData.targetLanguage);

			// Append the userId to the FormData
			formData.append('userId', $userData.id);

			// Add thumbnail file if available
			if (dictionaryData.thumbnail) {
				formData.append('thumbnail', dictionaryData.thumbnail);
			}

			// Make the request with file upload
			const response = await request('createDictionary', formData, {}, true);

			console.assert(response);

			// Close the modal and reset the form
			isDialogOpen = false;
			dictionaryData = {
				sourceLanguage: '',
				sourcePhonetics: '',
				targetLanguage: '',
				thumbnail: null
			};
		} catch (error) {
			console.error('Error creating dictionary:', error.message);
		}
	}
</script>

<Dialog.Root open={isDialogOpen}>
	<Dialog.Trigger class="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
		Create Dictionary
	</Dialog.Trigger>
	<Dialog.Content class="max-w-2xl rounded-lg bg-white p-6 shadow-lg">
		<Dialog.Header>
			<Dialog.Title class="text-lg font-semibold">Create a New Dictionary</Dialog.Title>
		</Dialog.Header>

		<div class="grid grid-cols-1 gap-4">
			<div class="flex items-center justify-between gap-3">
				<div class="flex-1">
					<Label for="sourceLanguage" class="block text-sm font-medium">Source Language</Label>
					<Input
						id="sourceLanguage"
						bind:value={dictionaryData.sourceLanguage}
						placeholder="Enter source language (e.g., Khmer)"
						required
					/>
				</div>
				<div class="flex-1">
					<Label for="sourcePhonetics" class="block text-sm font-medium">Source Phonetics</Label>
					<Input
						id="sourcePhonetics"
						bind:value={dictionaryData.sourcePhonetics}
						placeholder="Enter phonetic system (e.g., IPA)"
					/>
				</div>
			</div>
			<div>
				<Label for="targetLanguage" class="block text-sm font-medium">Target Language</Label>
				<Input
					id="targetLanguage"
					bind:value={dictionaryData.targetLanguage}
					placeholder="Enter target language (e.g., English)"
					required
				/>
			</div>
			<div>
				<Label for="thumbnail" class="block text-sm font-medium">Upload Thumbnail</Label>
				<input
					id="thumbnail"
					type="file"
					class="w-full rounded-lg border p-2"
					accept="image/*"
					on:change={(e) => (dictionaryData.thumbnail = e.target.files[0])}
				/>
			</div>
		</div>

		<div class="mt-4 flex justify-end">
			<Dialog.Close>
				<button
					class="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
					type="button"
				>
					Cancel
				</button>
			</Dialog.Close>
			<button
				class="ml-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
				on:click={createDictionary}
			>
				Create
			</button>
		</div>
	</Dialog.Content>
</Dialog.Root>
