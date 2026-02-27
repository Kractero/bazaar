<script lang="ts">
	import * as Select from '$lib/components/ui/select'

	import Label from './ui/label/label.svelte'

	interface Props {
		label: string
		subTitle?: string
		id: string
		items: string[]
		bindValue: any
	}

	let { label, subTitle = '', id, items, bindValue = $bindable() }: Props = $props()
</script>

<div class={`flex w-full max-w-lg items-center justify-between gap-4`}>
	<Label class={'w-24'} for={id}
		>{label}
		{#if subTitle}
			<span class="text-xs">{subTitle}</span>
		{/if}</Label
	>
	<Select.Root
		type="single"
		onValueChange={(v: any) => {
			bindValue = v && v
		}}
		value={bindValue}
	>
		<Select.Trigger class="data-placeholder:[&>span]:text-primary max-w-55.25 flex-1 justify-end">
			<span class="pr-2">{bindValue}</span>
		</Select.Trigger>
		<Select.Content class="text-left">
			{#each items as item, i}
				<Select.Item value={item}>{item}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>
