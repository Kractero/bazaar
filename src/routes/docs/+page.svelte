<script lang="ts">
	import Head from '$lib/components/Head.svelte'

	// @ts-expect-error importing docs markdown
	import Docs from './docs.md'
</script>

<Head title={`Bazaar - Docs`} description={'An archive of NationStates Trading Card trades'} />

<main>
	<div class="flex flex-col items-center justify-center">
		<div class="prose mb-40 dark:prose-invert">
			<Docs />
		</div>
	</div>
</main>
