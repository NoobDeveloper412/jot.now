<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import VideoJotsSidebar from '@/components/sidebars/VideoJotsSidebar.svelte';
	import VideoPlayer from '@/components/custom/Player/VideoPlayer.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import { formatTime } from '@/utils.js';
	import Input from '@/components/ui/input/input.svelte';
	import { request } from '@/network/api.js';
	import { Tipex } from '@friendofsvelte/tipex';

	// EDITOR CSS
	import '@friendofsvelte/tipex/styles/Tipex.css';
	import '@friendofsvelte/tipex/styles/ProseMirror.css';
	import '@friendofsvelte/tipex/styles/Controls.css';
	import '@friendofsvelte/tipex/styles/EditLink.css';
	import '@friendofsvelte/tipex/styles/CodeBlock.css';
	import Icon from '@iconify/svelte';

	export let data;

	let currentNote = null;
	let isLoading = false;
	let newJot = null;
	let currentTime = 0;
	let selectedJot = null;
	let editor;

	function handleJotClick(jot) {
		selectedJot = jot;
		newJot = null; // Reset new jot if a jot is selected
	}

	currentNote = data.folder.notes.find((note) => note._id === data.noteId) || null;
	let { jots } = currentNote || [];

	function createJot() {
		selectedJot = null; // Reset selected jot when creating a new jot
		newJot = {
			timestamp: currentTime,
			title: '',
			description: `<p>The initial html content.</p>`
		};
	}

	async function saveJot() {
		isLoading = true;
		try {
			const response = await request('addVideoJot', { ...newJot, noteId: currentNote._id });
			if (response.jots) {
				jots = [...response.jots];
			}
			newJot = null;
		} catch (error) {
			console.error('Error saving jot:', error);
		} finally {
			isLoading = false;
		}
	}

	function handleEditorUpdate(inst) {
		if (newJot) {
			newJot.description = inst.body;
		} else if (selectedJot) {
			selectedJot.description = inst.editor?.commands.setContent(selectedJot.description);
		}
	}
	// Function to get the index of the selected jot in the jots array
	function getSelectedJotIndex() {
		return jots.findIndex((jot) => jot._id === selectedJot?._id);
	}

	// Function to get the next jot
	function getNextJot() {
		const currentIndex = getSelectedJotIndex();
		if (currentIndex !== -1 && currentIndex < jots.length - 1) {
			selectedJot = jots[currentIndex + 1];
		}
	}

	// Function to get the previous jot
	function getPreviousJot() {
		const currentIndex = getSelectedJotIndex();
		if (currentIndex > 0) {
			selectedJot = jots[currentIndex - 1];
		}
	}

	$: {
		if (selectedJot && selectedJot.description) {
			editor?.commands.setContent(selectedJot.description);
		}
	}
</script>

<main class="flex h-screen">
	<Sidebar.Provider class="sticky top-0 h-full max-w-[270px] bg-gray">
		<VideoJotsSidebar {jots} createItem={createJot} itemClick={handleJotClick} {selectedJot}  />
	</Sidebar.Provider>

	<div class="theme-scrollbar flex flex-1 flex-col p-4">
		<div class="flex h-screen flex-col">
			<!-- Video Player Section -->
			<div class="mt-3 flex items-center justify-center rounded-md bg-[#E4E7EC]">
				<VideoPlayer bind:selectedJot videoLink={currentNote.videoLink} bind:currentTime bind:jots />
			</div>

			<hr class="my-2" />

			<!-- Jot Editing/Creation -->
			{#if newJot || selectedJot}
				<div class="flex w-full flex-1 flex-col space-y-2 pb-10">
					<h2 class="text-lg font-semibold">
						{#if newJot}
							Jotting at <span class="text-blue-500">{formatTime(newJot.timestamp)}</span>
						{:else}
							Editing Jot: <span class="text-blue-500">{selectedJot.title}</span> at
							<span class="text-blue-500">{formatTime(selectedJot.timestamp)}</span>
						{/if}
					</h2>
					<div class="mt-2">
						<Input
							value={newJot?.title || selectedJot?.title}
							placeholder="Title"
							class="theme-shadow rounded-lg border px-5 py-2"
						/>
					</div>
					<div class="mt-2">
						<Tipex
							body={newJot?.description || selectedJot?.description}
							bind:tipex={editor}
							controls
							floating
							onupdate={(inst) => handleEditorUpdate(inst)}
							style="margin-top: 1rem; margin-bottom: 0;"
							class="h-[30vh] border border-neutral-200"
						/>
					</div>
					<div class="mt-4 flex justify-between space-x-2">
						<div class="flex justify-start space-x-2">
							<Button onclick={() => (newJot = null)} class="bg-black text-white">Cancel</Button>
							<Button onclick={saveJot} class="bg-primary-500 text-white">Save Jot</Button>
						</div>
						<div class="flex justify-start space-x-2">
							<Button
								onclick={getPreviousJot}
								class="bg-[#F9FAFB] text-gray-400 hover:bg-primary hover:text-white"
								disabled={getSelectedJotIndex() === 0}
							>
								<Icon icon="mdi:chevron-left" class="h-6 w-6" />
							</Button>
							<Button
								onclick={getNextJot}
								class="bg-[#F9FAFB] text-gray-400 hover:bg-primary hover:text-white"
								disabled={getSelectedJotIndex() === jots.length - 1}
							>
								<Icon icon="mdi:chevron-right" class="h-6 w-6" />
							</Button>
						</div>
					</div>
				</div>
			{:else}
				<!-- Default View -->
				<div class="flex flex-1 flex-col items-center justify-center space-y-2 rounded-md border">
					<h1 class="text-xl font-semibold">Anything worth jotting down?</h1>
					<p class="text-sm text-gray-600">
						Click below to make your first jot at the current location.
					</p>
					<Button onclick={createJot} class="rounded-lg bg-primary-500 py-3 text-white">
						Jot Now <span>{currentTime ? formatTime(currentTime) : '0:00'}</span>
					</Button>
				</div>
			{/if}
		</div>
	</div>
</main>
