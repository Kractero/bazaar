<script lang="ts">
	import * as Select from '$lib/components/ui/select';

	// import FormSelectTheme from './FormSelectTheme.svelte'
	import Label from './ui/label/label.svelte';

	export let label: string;
	export let subTitle: string = '';
	export let id: string;
	export let items: string[];
	export let bindValue: any;

	function isTheme(value: string): value is 'system' | 'light' | 'dark' {
		return ['system', 'light', 'dark'].includes(value);
	}
</script>

<div class={`flex w-full max-w-lg items-center justify-between gap-4`}>
	<Label class={'w-24'} for={id}
		>{label}
		{#if subTitle}
			<span class="text-xs">{subTitle}</span>
		{/if}</Label
	>
	<Select.Root
		onSelectedChange={(v) => {
			bindValue = v && v.value;
		}}
		selected={bindValue}
	>
		<Select.Trigger class="data-[placeholder]:[&>span]:text-primary w-36">
			<Select.Value class="mr-2" placeholder={bindValue} />
		</Select.Trigger>
		<Select.Content>
			{#each items as item}
				<!-- {#if isTheme(item)} -->
				<!-- <FormSelectTheme bind:item /> -->
				<!-- {:else} -->
				<Select.Item value={item}>{item}</Select.Item>
				<!-- {/if} -->
			{/each}
		</Select.Content>
	</Select.Root>
</div>
