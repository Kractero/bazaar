<script lang="ts">
	import Head from '$lib/components/Head.svelte'
	import SvelteMarkdown from 'svelte-markdown'

	import Docs from './docs.md?raw'
</script>

<Head title={`Bazaar - Docs`} description={'An archive of NationStates Trading Card trades'} />

<main>
	<div class="flex flex-col items-center justify-center">
		<div class="prose mb-40 dark:prose-invert">
			<SvelteMarkdown source={Docs} />
		</div>
	</div>
</main>
