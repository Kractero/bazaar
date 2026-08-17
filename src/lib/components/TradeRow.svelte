<script lang="ts">
	import type { Trades } from '../../types';

	interface Props {
		trade: Trades;
	}

	let { trade }: Props = $props();
</script>

<tr>
	<td class="wrap-break-word border border-slate-600 p-2 text-xs sm:text-base">
		<a
			target="_blank"
			rel="noreferrer noopener"
			class={`hover:underline ${
				trade.category === 'c'
					? 'text-gray-500'
					: trade.category === 'u'
						? 'text-green-500'
						: trade.category === 'r'
							? 'text-blue-500'
							: trade.category === 'ur'
								? 'text-purple-500'
								: trade.category === 'e'
									? 'text-yellow-600'
									: trade.category === 'l'
										? 'text-yellow-400'
										: ''
			}`}
			href={`https://nationstates.net/page=deck/card=${trade.card_id}/season=${trade.season}`}
		>
			S{trade.season}
			{trade.card_name}
		</a>
	</td>
	<td class="wrap-break-word border border-slate-600 p-2 text-xs sm:text-base">
		<a
			target="_blank"
			rel="noreferrer noopener"
			class="hover:underline"
			href={`https://nationstates.net/nation=${trade.seller}`}
		>
			{trade.seller}
		</a>
	</td>
	<td class="wrap-break-word border border-slate-600 p-2 text-xs sm:text-base">
		<a
			target="_blank"
			rel="noreferrer noopener"
			class="hover:underline"
			href={`https://nationstates.net/nation=${trade.buyer}`}
		>
			{trade.buyer}
		</a>
	</td>
	<td class="border border-slate-600 p-2 text-xs sm:text-base">{trade.price}</td>
	<td class="wrap-break-word border border-slate-600 p-2 text-[0.5rem] sm:text-base">
		{trade.timestamp}
	</td>
</tr>
