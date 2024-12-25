<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { navigateTo } from '@/utils';
	import Loader from '@/components/custom/Loader.svelte';
	import VideoJotsSidebar from '@/components/sidebars/VideoJotsSidebar.svelte';
	import VideoPlayer from '@/components/custom/Player/VideoPlayer.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import { formatTime } from '@/utils.js';
	import Input from '@/components/ui/input/input.svelte';
	import { request } from '@/network/api.js';

	export let data;

	let currentNote = null;
	let isLoading = false;
	let newJot = null;
	let currentTime = 0;

	currentNote = data.folder.notes.find((note) => note._id === data.noteId) || null;
	let { jots } = currentNote || [];

	// Create a jot
	function createJot() {
		newJot = {
			timestamp: currentTime,
			title: '',
			description: ''
		};
	}

	// Save the jot without re-rendering the player
	async function saveJot() {
		isLoading = true;
		try {
			const response = await request('addVideoJot', { ...newJot, noteId: currentNote._id });
			if (response.jots) {
				jots = [...response.jots]; // Update `jots` without re-rendering the player
			}
			newJot = null;
		} catch (error) {
			console.error('Error saving jot:', error);
		} finally {
			isLoading = false;
		}
	}
</script>

<main class="flex h-screen">
	<Sidebar.Provider class="max-w-[270px] bg-gray">
		<VideoJotsSidebar {jots} createItem={createJot} />
	</Sidebar.Provider>

	<div class="flex flex-1 flex-col p-4">
		<div class="flex h-screen flex-col">
			<!-- Video Player Section -->
			<div class="mt-3 flex items-center justify-center rounded-md bg-[#E4E7EC]">
				<VideoPlayer videoLink={currentNote.videoLink} bind:currentTime />
			</div>

			<hr class="my-2" />

			<!-- Jot Creation -->
			{#if newJot}
				<div class="flex w-full flex-1 flex-col space-y-2">
					<h2 class="text-lg font-semibold">
						Jotting at <span class="text-blue-500">{formatTime(newJot.timestamp)}</span>
					</h2>
					<div class="mt-2">
						<Input
							bind:value={newJot.title}
							placeholder="Title"
							class="theme-shadow rounded-lg border px-5 py-2"
						/>
					</div>
					<div class="mt-2">
						<textarea
							class="theme-shadow min-h-36 w-full rounded-lg border px-5 py-2"
							placeholder="Enter description"
							bind:value={newJot.description}
						></textarea>
					</div>
					<div class="mt-4 flex justify-start space-x-2">
						<Button onclick={() => (newJot = null)} class="bg-black text-white">Cancel</Button>
						<Button onclick={saveJot} class="bg-primary-500 text-white">Save Jot</Button>
					</div>
				</div>
			{:else}
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
