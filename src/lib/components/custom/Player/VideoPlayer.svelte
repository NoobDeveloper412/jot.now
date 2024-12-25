<script>
	import { onMount } from 'svelte';
	import '@vime/core/themes/default.css';
	import PlayerControls from './PlayerControls.svelte';

	export let videoLink = '';
	let playerRef;
	export let currentTime = 0;

	let videoId = '';
	let isYouTube = false;
	let isVimeo = false;

	onMount(async () => {
		const { defineCustomElements } = await import('@vime/core');
		defineCustomElements();

		if (videoLink.includes('youtube.com') || videoLink.includes('youtu.be')) {
			isYouTube = true;
			videoId = extractYouTubeId(videoLink);
		} else if (videoLink.includes('vimeo.com')) {
			isVimeo = true;
			videoId = extractVimeoId(videoLink);
		}
	});

	function extractYouTubeId(link) {
		const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]+)/;
		return link.match(regex)?.[1] || '';
	}

	function extractVimeoId(link) {
		const regex =
			/vimeo\.com\/(?:channels\/\w+\/|groups\/\w+\/videos\/album\/\d+\/video\/|video\/|)(\d+)/;
		return link.match(regex)?.[1] || '';
	}

	// Callback for `currentTime` updates
	function handleTimeUpdate(time) {
		currentTime = time;
	}
</script>

<div class="player-container">
	<div class="video-section">
		{#if isYouTube && videoId}
			<vm-player bind:this={playerRef} class="video-player" style="--vm-player-theme: #4f46e5;">
				<vm-youtube {videoId} />
			</vm-player>
		{:else if isVimeo && videoId}
			<vm-player bind:this={playerRef} class="video-player" style="--vm-player-theme: #4f46e5;">
				<vm-vimeo {videoId} />
			</vm-player>
		{:else}
			<p class="text-center text-red-500">
				Invalid video link. Please provide a valid YouTube or Vimeo URL.
			</p>
		{/if}
	</div>

	<PlayerControls player={playerRef} onTimeUpdate={handleTimeUpdate} />
</div>

<style>
	.player-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 580px;
		height: 100%;
		padding: 10px 0px;
		margin: 0 auto;
		overflow: hidden;
	}

	.video-section {
		flex: 4;
		position: relative;
		height: 75%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.video-player {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
</style>
