<script lang="ts">
	import { DateFormatter, getLocalTimeZone, type DateValue } from '@internationalized/date'
	import { Button } from '$lib/components/ui/button/index.js'
	import { Calendar } from '$lib/components/ui/calendar/index.js'
	import * as Popover from '$lib/components/ui/popover/index.js'
	import { cn } from '$lib/utils.js'
	import CalendarIcon from 'lucide-svelte/icons/calendar'

	import Label from './ui/label/label.svelte'

	const df = new DateFormatter('en-US', {
		dateStyle: 'long',
	})

	interface Props {
		minTimestamp?: DateValue | undefined
		maxTimestamp?: DateValue | undefined
	}

	let { minTimestamp = $bindable(undefined), maxTimestamp = $bindable(undefined) }: Props = $props()

	function validateDates() {
		if (!minTimestamp || !maxTimestamp) return
		if (minTimestamp > maxTimestamp) {
			minTimestamp = maxTimestamp
		}
		if (maxTimestamp < minTimestamp) {
			maxTimestamp = minTimestamp
		}
	}
</script>

<div class={`flex w-full max-w-lg items-center justify-between gap-4`}>
	<Label class={'w-24'} for="price">Timestamp</Label>
	<div class="flex w-full flex-col items-end">
		<Popover.Root>
			<Popover.Trigger>
				<Button
					variant="outline"
					class={cn(
						'w-36 justify-end text-left font-normal',
						!minTimestamp && 'text-muted-foreground'
					)}
				>
					<CalendarIcon class="ml-3 h-4 w-4" />
					{minTimestamp ? df.format(minTimestamp.toDate(getLocalTimeZone())) : ''}
				</Button>
			</Popover.Trigger>
			<Popover.Content class="w-auto p-0">
				<Calendar
					type="single"
					bind:value={minTimestamp}
					initialFocus
					onPlaceholderChange={validateDates}
					onValueChange={validateDates}
				/>
			</Popover.Content>
		</Popover.Root>

		<Popover.Root>
			<Popover.Trigger>
				<Button
					variant="outline"
					class={cn(
						'mt-3 w-36 justify-end text-left font-normal',
						!maxTimestamp && 'text-muted-foreground'
					)}
				>
					<CalendarIcon class="ml-3 h-4 w-4" />
					{maxTimestamp ? df.format(maxTimestamp.toDate(getLocalTimeZone())) : ''}
				</Button>
			</Popover.Trigger>
			<Popover.Content class="w-auto p-0">
				<Calendar
					type="single"
					bind:value={maxTimestamp}
					initialFocus
					onPlaceholderChange={validateDates}
					onValueChange={validateDates}
				/>
			</Popover.Content>
		</Popover.Root>
	</div>
</div>
