<script lang="ts">
	import IconPicker from '@/components/custom/IconPicker.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import { navigateTo } from '@/utils';

	export let notes: {
		id: number;
		name: string;
		icon: string;
		description: string;
		url: string;
		thumbnail?: string;
	}[] = [];
	let selectedIcon = 'mdi:file-document';
	export let createNote;

	let newNoteName = '';
	let description = '';
	let url = '';

	// Function to get video thumbnail from URL
	function getVideoThumbnail(videoUrl: string): string {
		try {
			const url = new URL(videoUrl);

			// Handle YouTube video links
			if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
				const videoId =
					url.hostname === 'youtu.be'
						? url.pathname.substring(1) // youtu.be/{id}
						: url.searchParams.get('v'); // youtube.com/watch?v={id}

				if (videoId) {
					return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; // YouTube HQ thumbnail
				}
			}
		} catch (e) {
			console.error('Invalid URL:', videoUrl);
		}

		// Return a placeholder thumbnail if parsing fails
		return 'https://fakeimg.pl/600x400';
	}
</script>

<div class="m-3">
	<p class="text-tertiary text-sm">Video Notes</p>

	<div class="mb-4 mt-3 flex w-max items-center justify-start space-x-2">
		<Input
			bind:value={newNoteName}
			placeholder="Title"
			class="theme-shadow w-[11rem] rounded-lg border border-gray-700 px-5 py-2 pr-10 placeholder-[#97A1AF]"
		/>
		<Input
			bind:value={description}
			placeholder="Description"
			class="theme-shadow w-[11rem] rounded-lg border border-gray-700 px-5 py-2 pr-10 placeholder-[#97A1AF]"
		/>
		<Input
			bind:value={url}
			placeholder="URL"
			class="theme-shadow w-[11rem] rounded-lg border border-gray-700 px-5 py-2 pr-10 placeholder-[#97A1AF]"
		/>
		<Button
			onclick={() => createNote(newNoteName, url, '', description)}
			class="rounded-lg bg-primary-500 px-6 py-3 text-white">Add Note</Button
		>
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each notes as note}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				on:click={() => navigateTo('notes', note._id)}
				class="theme-shadow flex cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-700"
			>
				<!-- Thumbnail -->
				<img
					src={note.thumbnail || getVideoThumbnail(note.videoLink)}
					alt={note.name}
					class="h-48 w-full object-cover"
				/>

				<!-- Content -->
				<div class="p-4">
					<p class="text-sm font-bold text-[#344051]">{note.name}</p>
					<p class="text-sm text-[#97A1AF]">{note.description || 'No Description'}</p>
					<p class="mt-4 text-sm font-medium text-[#344051]">{note.jots.length || 0} Jots</p>
				</div>
			</div>
		{/each}
	</div>
</div>
