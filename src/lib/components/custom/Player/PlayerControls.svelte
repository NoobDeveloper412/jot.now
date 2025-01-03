<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { formatTime } from '@/utils';
	import Icon from '@iconify/svelte';

	export let player;
	export let onTimeUpdate;
	export let jots;
	let currentTime = 0;
	let duration = 0;
	let isPaused = true;
	let volume = 1;
	let showVolumeSlider = false;

	// Attach event listeners
	onMount(() => {
		const waitForPlayer = setInterval(() => {
			if (player) {
				player.addEventListener('vmCurrentTimeChange', (event) => {
					currentTime = event.detail;
					if (onTimeUpdate) {
						onTimeUpdate(currentTime);
					}
				});
				player.addEventListener('vmDurationChange', (event) => {
					duration = event.detail || 0;
				});
				player.addEventListener('vmPausedChange', (event) => {
					isPaused = event.detail;
				});
				player.addEventListener('vmVolumeChange', (event) => {
					volume = event.detail;
				});
				volume = player.volume || 1;
				clearInterval(waitForPlayer);
			}
		}, 50);
	});

	// Toggle playback
	function togglePlayback() {
		if (!player) return;
		if (isPaused) {
			player.play().catch((error) => console.error('Failed to play:', error));
		} else {
			player.pause().catch((error) => console.error('Failed to pause:', error));
		}
	}

	// Seek to specific time
	function seek(event) {
		if (!player) return;
		player.currentTime = parseFloat(event.target.value);
	}

	// Change volume
	function changeVolume(event) {
		if (!player) return;
		const newVolume = parseFloat(event.target.value);
		player.volume = newVolume;
		volume = newVolume;
	}

	// Calculate progress percentage
	$: progress = duration > 0 ? (currentTime / duration) * 100 : 0;

	// Calculate jot positions
	$: jotMarks = jots?.map((jot) => (jot.timestamp / duration) * 100) || [];
</script>

<div class="controls-container">
	<div class="flex items-center space-x-4">
		<!-- Play/Pause Button -->
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
		<div class="flex items-center space-x-2 text-gray-600">
			<span class="text-blue-500">{formatTime(currentTime)}</span>
			<span class="text-[#97A1AF]">/</span>
			<span class="text-[#97A1AF]">{formatTime(duration)}</span>
		</div>

		<!-- Progress Slider with Marks -->
		<div class="controls-container">
			<div class="relative w-full">
				<!-- Slider Input -->
				<input
					type="range"
					class="slider"
					min="0"
					max={duration || 0}
					step="0.1"
					value={currentTime}
					on:input={seek}
					style="background: linear-gradient(to right, #4f46e5 {progress}%, #97A1AF {progress}%);"
				/>
				<!-- Jot Marks -->
				<div class="marks-container">
					{#each jotMarks as mark}
						<div class="mark" style="left: {mark}%;"></div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Volume Control -->
		<div class="relative flex items-center">
			<!-- Volume Icon -->
			<button
				on:click={() => (showVolumeSlider = !showVolumeSlider)}
				class="flex items-center justify-center p-2 text-gray-500 hover:text-blue-500"
			>
				<Icon icon="material-symbols:volume-up" class="h-5 w-5 text-blue-500" />
			</button>

			<!-- Vertical Volume Slider -->
			{#if showVolumeSlider}
				<div class="absolute bottom-10 right-[-45px] z-10">
					<input
						type="range"
						min="1"
						max="100"
						step="0.1"
						on:input={changeVolume}
						class="vertical-slider"
					/>
				</div>
			{/if}
		</div>

		<!-- More Options -->
		<button class="flex items-center justify-center p-2 text-blue-500">
			<Icon icon="mdi:dots-vertical" class="h-6 w-6" />
		</button>
	</div>
</div>

<style>
	.controls-container {
		width: 100%;
		z-index: 10;
		padding: 0.5rem 0rem;
		position: relative;
	}

	.slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 6px;
		background: #97a1af;
		border-radius: 3px;
		outline: none;
		transition: background 0.3s;
		position: relative;
		z-index: 1; /* Ensure it appears above marks */
	}

	.marks-container {
		position: absolute;
		top: 12px;
		left: 0;
		width: 100%;
		height: 6px;
		z-index: 1; /* Below the slider */
		pointer-events: none; /* Prevent interaction */
		overflow: hidden; /* Prevent marks from overflowing */
	}

	.mark {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background-color: #4f46e5;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 12px;
		height: 12px;
		background: #4f46e5;
		border-radius: 50%;
		cursor: pointer;
	}

	.vertical-slider {
		-webkit-appearance: slider-vertical;
	}

	.slider:hover,
	.vertical-slider:hover {
		background: #d1d5db;
	}
</style>
