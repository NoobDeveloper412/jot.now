<script lang="ts">
	import { request } from '@/network/api';
	import { userData } from '@/stores/authStore';
	import { invalidate } from '$app/navigation';
	import Loader from '@/components/custom/Loader.svelte';
	import YoutubeSidebar from '@/components/sidebars/YoutubeSidebar.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index';
	import VideoJotter from '@/components/custom/VideoJotter.svelte';
	import VideoPlayer from '@/components/custom/Player/VideoPlayer.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';

	export let data; // Assuming `data` contains the folder and notes
	console.log(data);

	let jots = [];
	let currentNote = null;
	let isLoading = false;

	// Function to match the note by ID
	function getNoteById(noteId: string) {
		return data.folder.notes.find((note) => note._id === noteId) || null;
	}

	currentNote = getNoteById(data.noteId);

	async function createJot() {
		isLoading = true;
		try {
			console.log('Jotting it down!');
			// Add jot creation logic here
		} catch (error) {
			console.error('Error:', error);
		} finally {
			isLoading = false;
		}
	}
</script>

<main class="flex h-screen">
	<Sidebar.Provider class="max-w-[270px] bg-gray">
		<YoutubeSidebar {jots} createItem={createJot} />
	</Sidebar.Provider>

	<div class="flex flex-1 flex-col p-4">
		{#if isLoading}
			<Loader />
		{:else if jots.length < 1}
			<div class="flex h-screen flex-col">
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item>
							<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator />
						<Breadcrumb.Item>
							<Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator />
						<Breadcrumb.Item>
							<Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>

				<!-- Video Player Section -->
				<div class="flex items-center justify-center mt-3 bg-[#E4E7EC] rounded-md">
					{#if currentNote?.videoLink}
						<VideoPlayer videoLink={currentNote.videoLink} />
					{:else}
						<p>No video link available.</p>
					{/if}
				</div>

				<!-- Header Section -->
				<div class="flex flex-1 items-center justify-center bg-gray-100">
					<h1 class="text-lg font-bold text-gray-700">Anything worth jotting down?</h1>
				</div>
			</div>
		{:else}
			<VideoJotter />
		{/if}
	</div>
</main>
