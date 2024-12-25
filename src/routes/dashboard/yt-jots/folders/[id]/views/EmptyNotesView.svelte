<script lang="ts">
	import Button from '@/components/ui/button/button.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import Icon from '@iconify/svelte';

	export let createNote;

	let newNoteName = '';
	let thumbnail = '';
	let videoLink = '';
</script>

<div class="m-3 flex flex-col items-center border border-2 border-[#F2F4F7] py-20">
	<div class="text-center">
		<h4 class="text-4xl font-medium leading-[44px]">What will you learn today?</h4>
		<p class="my-4 mt-2 text-lg leading-8">Paste a video url to begin jotting down notes.</p>
	</div>

	<div class="flex items-center justify-center gap-3">
		<div class="relative flex w-fit items-center">
			<Input
				type="text"
				bind:value={newNoteName}
				placeholder="Name your note"
				class="rounded-lg border border-gray-700 px-5 py-2 pr-10 placeholder-[#97A1AF] w-[11rem]"
			/>
			<Icon icon="ci:text" class="absolute right-3 h-5 w-5 text-[#97A1AF]" />
		</div>

		<div class="relative flex w-fit items-center">
			<Input
				type="text"
				bind:value={videoLink}
				placeholder="Paste Video URL here"
				class="rounded-lg border border-gray-700 px-5 py-2 pr-10 placeholder-[#97A1AF] w-[13rem]"
			/>
			<Icon icon="mdi:link-variant" class="absolute right-3 h-5 w-5 text-[#97A1AF]" />
		</div>

		<Button
			onclick={() => createNote(newNoteName, videoLink, thumbnail)}
			class="rounded-lg bg-primary-500 px-6 py-3 text-white hover:bg-primary"
		>
			Jot Now
		</Button>
	</div>
</div>
