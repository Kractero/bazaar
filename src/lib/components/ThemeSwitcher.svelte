<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js'
	import Moon from 'lucide-svelte/icons/moon'
	import Sun from 'lucide-svelte/icons/sun'
	import { toggleMode } from 'mode-watcher'
</script>

<Button onclick={toggleMode} variant="ghost">
	<Sun class="size-6 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
	<Moon class="absolute size-6 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
	<span class="sr-only">Toggle theme</span>
</Button>
