import type { ImageGridItem } from '$lib/types/index.js';

// --- Animated sources (decode every frame, continuously) --------------------
// Clustered in the INNER 2×2 cells (2/2, 2/3, 3/2, 3/3) around the centre title,
// where the eye lands. Everything else is a static first-frame still (one shared
// decoded bitmap, ~zero CPU) so the cascade stays dense without piling on
// decoders. Stills are the matching `*-still.avif` one-frame extracts.
import nba from '$lib/images/nba.avif';
import novaCanvas from '$lib/images/nova-canvas.avif';
import pixelPrompt from '$lib/images/pixel-prompt-grid.avif';
import connector from '$lib/images/connector.avif';
import float from '$lib/images/float-grid.avif';
import instant from '$lib/images/instant.avif';
import twa from '$lib/images/twa_short.avif';
import vocab from '$lib/images/vocabulary-grid.avif';

// --- Static stills (first frame only; free to reuse across tiles) -----------
import trachtenbergStill from '$lib/images/trachtenberg-grid-still.avif';
import vocabStill from '$lib/images/vocabulary-grid-still.avif';
import savorSwipeStill from '$lib/images/savorswipe-grid-still.avif';
import stocksStill from '$lib/images/stock-grid-still.avif';
import credentialsStill from '$lib/images/credentials_short-still.avif';
import stockSentStill from '$lib/images/stock-sent-still.avif';
import twaStill from '$lib/images/twa_short-still.avif';
import plotPaletteStill from '$lib/images/plotpalette-still.avif';
import whoamiStill from '$lib/images/name-check-grid-still.avif';
import studioBrowserStill from '$lib/images/as-medium-still.avif';

// Grid is 4×4. Each tile's CELL is set by its position in this list (the
// nth-of-type → grid-area rules in ImageGrid.svelte), noted in the trailing
// comment. [A] = animated, all in the inner cells. The title spans the middle.
// Repeated stills are placed ≥2 cells apart (and, when only 2 apart, on
// non-overlapping scroll timings) so no copy ever reads as stacked on its twin.
export const gridImages: ImageGridItem[] = [
	// first pass — fills the 4×4 once
	{ id: 'stocks-1', src: stocksStill, alt: 'Stocks project' }, // 1/1
	{ id: 'vocab-1', src: vocabStill, alt: 'Vocabulary project' }, // 1/2
	{ id: 'credentials-1', src: credentialsStill, alt: 'Credentials project' }, // 1/3
	{ id: 'twa-1', src: twaStill, alt: 'TWA project' }, // 1/4
	{ id: 'savor-swipe-1', src: savorSwipeStill, alt: 'Savor Swipe project' }, // 2/1
	{ id: 'nova-canvas-1', src: novaCanvas, alt: 'Nova Canvas project' }, // 2/2 [A]
	{ id: 'float-1', src: float, alt: 'Float project' }, // 2/3 [A] centre
	{ id: 'plot-palette-1', src: plotPaletteStill, alt: 'Plot Palette project' }, // 2/4
	{ id: 'trachtenberg-1', src: trachtenbergStill, alt: 'Trachtenberg project' }, // 3/1
	{ id: 'connector-1', src: connector, alt: 'Connector project' }, // 3/2 [A]
	{
		id: 'special-text',
		src: '',
		alt: '',
		special: true,
		content: "I'm Chris...Here's Some Stuff."
	}, // centre 2×2 title
	{ id: 'whoami-1', src: whoamiStill, alt: 'Who Am I project' }, // 3/4
	{ id: 'stock-sent-1', src: stockSentStill, alt: 'Stock Sentiment project' }, // 4/1
	{ id: 'studio-browser-1', src: studioBrowserStill, alt: 'Studio Browser project' }, // 4/2
	{ id: 'vocab-2', src: vocab, alt: 'Vocabulary project' }, // 4/3 [A] animated late by choice
	{ id: 'stocks-2', src: stocksStill, alt: 'Stocks project' }, // 4/4
	// second pass — overlapping wave through the centre rows (the cascade)
	{ id: 'plot-palette-2', src: plotPaletteStill, alt: 'Plot Palette project' }, // 2/1
	{ id: 'twa-2', src: twa, alt: 'TWA project' }, // 2/2 [A] animated late by choice
	{ id: 'pixel-prompt-1', src: pixelPrompt, alt: 'Pixel Prompt project' }, // 2/3 [A] centre
	{ id: 'savor-swipe-2', src: savorSwipeStill, alt: 'Savor Swipe project' }, // 2/4
	{ id: 'credentials-2', src: credentialsStill, alt: 'Credentials project' }, // 3/1
	{ id: 'nba-1', src: nba, alt: 'NBA project' }, // 3/2 [A]
	{ id: 'instant-1', src: instant, alt: 'Instant project' }, // 3/3 [A] centre
	{ id: 'trachtenberg-2', src: trachtenbergStill, alt: 'Trachtenberg project' }, // 3/4
	{ id: 'stock-sent-2', src: stockSentStill, alt: 'Stock Sentiment project' }, // 1/1
	{ id: 'studio-browser-2', src: studioBrowserStill, alt: 'Studio Browser project' } // 1/2
];
