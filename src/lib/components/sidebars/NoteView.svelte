<script lang="ts">
	import type { Note } from '@/types/dictionary';

	export let note: Note;
</script>

<div class="space-y-[1px]">
	{#each note.jots as jot}
		<div class="flex items-center gap-2 rounded-sm bg-white pl-2">
			{#if jot.time}
				<p class="text-[#CBD5E1]">{jot.time}</p>
			{/if}
			<p>{jot.label}</p>
		</div>
	{/each}
</div>
