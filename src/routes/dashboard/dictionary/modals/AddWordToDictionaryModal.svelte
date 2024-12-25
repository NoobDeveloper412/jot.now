<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import Input from '@/components/ui/input/input.svelte';
	import Label from '@/components/ui/label/label.svelte';

	let isDialogOpen = false;

	// Data model for adding or updating a word
	let wordData = {
		source: '',
		phonetics: '',
		target: '',
		level: '1',
		partOfSpeech: [],
		definitions: [
			{
				sourceDefinition: '',
				targetDefinition: '',
				examples: [{ sourceExample: '', phoneticExample: '', targetExample: '' }]
			}
		]
	};
</script>

<Dialog.Root open={isDialogOpen}>
	<Dialog.Trigger class="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
		Add Word
	</Dialog.Trigger>
	<Dialog.Content class="max-w-3xl rounded-lg bg-white p-6 shadow-lg">
		<Dialog.Header>
			<Dialog.Title class="text-lg font-semibold">Add Word in Dictionary</Dialog.Title>
		</Dialog.Header>

		<div class="grid grid-cols-1 gap-4">
			<!-- Source, Phonetics, Target, Level -->
			<div class="grid grid-cols-4 items-center gap-4">
				<div>
					<Label for="source" class="block text-sm font-medium">Source</Label>
					<Input
						id="source"
						bind:value={wordData.source}
						placeholder="Khmer (e.g., ទៅ)"
						class="col-span-1"
						required
					/>
				</div>
				<div>
					<Label for="phonetics" class="block text-sm font-medium">Phonetics</Label>
					<Input
						id="phonetics"
						bind:value={wordData.phonetics}
						placeholder="Phonetics (e.g., tvee)"
						class="col-span-1"
					/>
				</div>
				<div>
					<Label for="target" class="block text-sm font-medium">Target</Label>
					<Input
						id="target"
						bind:value={wordData.target}
						placeholder="Target (e.g., do)"
						class="col-span-1"
					/>
				</div>
				<div class="col-span-1">
					<Label for="level" class="block text-sm font-medium">Level</Label>
					<select
						id="level"
						bind:value={wordData.level}
						class="w-full rounded-lg border p-2"
					>
						{#each [1, 2, 3, 4, 5] as level}
							<option value={level}>{level}</option>
						{/each}
					</select>
				</div>
			</div>

			<!-- Part of Speech -->
			<div>
				<Label class="mb-1 block text-sm font-medium">Part of Speech</Label>
				<div class="grid grid-cols-3 gap-2">
					{#each wordData.partOfSpeech as pos, i}
						<Input
							bind:value={wordData.partOfSpeech[i]}
							placeholder="Part of speech (e.g., verb)"
							class="col-span-1"
						/>
					{/each}
					<button class="col-span-1 text-blue-500" on:click={() => wordData.partOfSpeech.push('')}>
						+ Add
					</button>
				</div>
			</div>

			<!-- Definitions -->
			<div>
				<Label class="mb-1 block text-sm font-medium">Definitions</Label>
				{#each wordData.definitions as def, defIndex}
					<div class="mb-4 rounded-lg border p-4">
						<div class="grid grid-cols-2 gap-4">
							<div>
								<Label for="sourceDefinition" class="block text-sm font-medium">Khmer Definition</Label>
								<Input
									id="sourceDefinition"
									bind:value={wordData.definitions[defIndex].sourceDefinition}
									placeholder="Khmer Definition"
									class="col-span-1"
								/>
							</div>
							<div>
								<Label for="targetDefinition" class="block text-sm font-medium">English Definition</Label>
								<Input
									id="targetDefinition"
									bind:value={wordData.definitions[defIndex].targetDefinition}
									placeholder="English Definition"
									class="col-span-1"
								/>
							</div>
						</div>
						<!-- Examples -->
						<div class="mt-4">
							<Label class="mb-1 block text-sm font-medium">Examples</Label>
							{#each def.examples as ex, exIndex}
								<div class="mb-2 grid grid-cols-3 gap-4">
									<Input
										bind:value={wordData.definitions[defIndex].examples[exIndex].sourceExample}
										placeholder="Source Example"
										class="col-span-1"
									/>
									<Input
										bind:value={wordData.definitions[defIndex].examples[exIndex].phoneticExample}
										placeholder="Phonetic Example"
										class="col-span-1"
									/>
									<Input
										bind:value={wordData.definitions[defIndex].examples[exIndex].targetExample}
										placeholder="Target Example"
										class="col-span-1"
									/>
								</div>
								<button
									class="text-red-500"
									on:click={() => wordData.definitions[defIndex].examples.splice(exIndex, 1)}
								>
									Remove Example
								</button>
							{/each}
							<button
								class="mt-2 text-blue-500"
								on:click={() =>
									wordData.definitions[defIndex].examples.push({
										sourceExample: '',
										phoneticExample: '',
										targetExample: ''
									})}
							>
								+ Add Example
							</button>
						</div>
					</div>
				{/each}
				<button
					class="text-blue-500"
					on:click={() =>
						wordData.definitions.push({
							sourceDefinition: '',
							targetDefinition: '',
							examples: [{ sourceExample: '', phoneticExample: '', targetExample: '' }]
						})}
				>
					+ Add Definition
				</button>
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
				on:click={() => console.log(wordData)}
			>
				Save
			</button>
		</div>
	</Dialog.Content>
</Dialog.Root>
