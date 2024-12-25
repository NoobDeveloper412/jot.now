<script>
	import { onMount } from 'svelte';
	import { formatTime } from '@/utils';
	import Button from '@/components/ui/button/button.svelte';
	import Icon from '@iconify/svelte';

	export let player; // Reference to the Vime player instance

	let currentTime = 0;
	let duration = 0;
	let isPaused = true;

	// Attach event listeners when the component is mounted
	onMount(() => {
		if (player) {
			player.addEventListener('vmCurrentTimeChange', (event) => {
				currentTime = event.detail;
			});
			player.addEventListener('vmDurationChange', (event) => {
				duration = event.detail;
			});
			player.addEventListener('vmPausedChange', (event) => {
				isPaused = event.detail;
			});
		}
	});

	// Toggle playback state
	function togglePlayback() {
		if (!player) return;
		if (isPaused) {
			player.play().catch((error) => console.error('Failed to play:', error));
		} else {
			player.pause().catch((error) => console.error('Failed to pause:', error));
		}
	}

	// Seek to a specific time
	function seek(event) {
		if (!player) return;
		player.currentTime = parseFloat(event.target.value);
	}
</script>

<div class="controls-container">
	<div class="flex items-center space-x-4">
		<div class="flex items-center justify-center space-x-2">
			<!-- Play/Pause Button with Icon -->
			<button
				on:click={togglePlayback}
				class="flex items-center justify-center rounded-lg p-2 text-blue-500 hover:bg-blue-500 hover:text-white"
			>
				<Icon
					icon={isPaused ? 'tabler:player-play-filled' : 'material-symbols:pause-outline-rounded'}
					class="h-6 w-6"
				/>
			</button>

			<!-- Timeline -->
			<div class="flex w-[120px] items-center space-x-2 text-gray-600">
				<span class="text-blue-500">{formatTime(currentTime)}</span>
				<span class="text-[#97A1AF]">/</span>
				<span class="text-[#97A1AF]">{formatTime(duration)}</span>
			</div>
		</div>

		<!-- Slider -->
		<input
			type="range"
			class="slider flex-grow"
			min="0"
			max={duration || 0}
			step="0.1"
			value={currentTime}
			on:input={seek}
		/>

		<!-- New Jot Button -->
		<button
			class="bover:bg-blue-500 flex w-48 flex-nowrap items-center justify-center gap-1 rounded-lg bg-blue-500 py-2 text-white"
		>
			<p class="text-sm text-white">New Jot</p>
			<img src="/icons/NewJot.svg" alt="jot_icon" />
		</button>
	</div>
</div>

<style>
	.controls-container {
		box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);
		width: 100%;
		z-index: 10;
		padding: 0.5rem 0rem;
	}

	.slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 6px;
		background: #e5e7eb;
		border-radius: 3px;
		outline: none;
		transition: background 0.3s;
	}

	.slider:hover {
		background: #d1d5db;
	}

	.volume-slider {
		-webkit-appearance: none;
		appearance: none;
		width: 6px;
		height: 100px;
		background: white;
		border-radius: 3px;
		outline: none;
		transition: background 0.3s;
	}

	.volume-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 12px;
		height: 12px;
		background: #4f46e5;
		border-radius: 50%;
		cursor: pointer;
	}

	.slider:hover {
		background: #d1d5db;
	}

	.flex {
		display: flex;
		align-items: center;
	}
</style>
