import type { Project } from '$lib/types/index.js';
import floata from '$lib/images/float.avif';
import floatj from '$lib/images/float.jpg';
import savorSwipea from '$lib/images/savorswipe.avif';
import savorSwipej from '$lib/images/savorswipe.jpg';
import htta from '$lib/images/htt.avif';
import httj from '$lib/images/htt.jpg';
import vocaba from '$lib/images/vocabulary.avif';
import vocabs from '$lib/images/vocabulary.svg';
import ragstacka from '$lib/images/ragstack.avif';
import ragstackj from '$lib/images/ragstack.jpg';
import localNanoa from '$lib/images/local_nano.avif';
import localNanoj from '$lib/images/local_nano.jpg';
import materialBriefa from '$lib/images/materialbrief.avif';
import materialBriefs from '$lib/images/materialbrief.svg';
import warmDegreesa from '$lib/images/warmdegrees.avif';
import warmDegreess from '$lib/images/warmdegrees.svg';

export const projects: Project[] = [
	{
		id: 'float',
		title: 'Float',
		description:
			'Cross-platform meditation app using Google Generative AI and TTS. Submit emotional incidents ("floats") to generate personalized meditations categorized by emotion and intensity.',
		category: 'Cross-Platform',
		images: {
			profession: floata,
			profile: floatj
		},
		link: 'https://float.hatstack.fun',
		github: 'https://github.com/HatmanStack/float',
		buttonText: 'Meditate'
	},
	{
		id: 'material-brief',
		title: 'Material Brief',
		description:
			"Most alerts tell you a stock moved — you already knew that. This reads the day's full coverage of the companies you hold, not just headlines, and tells you why: each event scored by a model fitted to that stock's own history.",
		category: 'Web',
		images: {
			profession: materialBriefa,
			profile: materialBriefs
		},
		link: 'https://materialbrief.com',
		buttonText: 'Brief'
	},
	{
		id: 'warmdegrees',
		title: 'WarmDegrees',
		description:
			'Say what you are trying to achieve and it works out what that takes — the people, the proof, the steps — then routes you through whoever can vouch for you, scoring progress against real evidence. Approval is the default; autonomy is per goal, inside quiet hours, caps and cooldowns.',
		category: 'Web',
		images: {
			profession: warmDegreesa,
			profile: warmDegreess
		},
		link: 'https://warmdegrees.com',
		buttonText: 'Reach'
	}
];

export const projectsRow2: Project[] = [
	{
		id: 'hold-that-thought',
		title: 'Family Archive - Document AI',
		description:
			'Private family platform for sharing letters, photos, and memories. AI-powered transcription, shared gallery, and RAG backend for semantic search and chat.',
		category: 'Web',
		images: {
			profession: htta,
			profile: httj
		},
		link: 'https://showcase-htt.hatstack.fun',
		github: 'https://github.com/HatmanStack/family-archive-document-ai',
		buttonText: 'Link'
	},
	{
		id: 'ragstack',
		title: 'RAGStack',
		// Demo credentials are intentionally public for portfolio visitors to try the app
		description:
			'Serverless document processing with AI chat. Upload docs, OCR extraction, query via Amazon Bedrock. One-click AWS deploy. Login: guest@hatstack.fun / Guest@123',
		category: 'AWS',
		images: {
			profession: ragstacka,
			profile: ragstackj
		},
		link: 'https://dhrmkxyt1t9pb.cloudfront.net/login',
		github: 'https://github.com/HatmanStack/RAGStack-Lambda',
		buttonText: 'RAG'
	},
	{
		id: 'vocabulary',
		title: 'Vocabulary',
		description:
			'300+ word vocabulary builder. Multiple choice and fill-in-the-blank formats with per-list progress tracking and persistent high scores.',
		category: 'Cross-Platform',
		images: {
			profession: vocaba,
			profile: vocabs
		},
		link: 'https://vocabulary.hatstack.fun',
		github: 'https://github.com/HatmanStack/react-vocabulary',
		buttonText: 'Learn'
	}
];

export const projectsRow3: Project[] = [
	{
		id: 'savor-swipe',
		title: 'Savor Swipe',
		description:
			'Recipe discovery app with swipe interface. Photograph ingredients or directions—OpenAI OCR extracts the info, Google Search finds matching food images.',
		category: 'Cross-Platform',
		images: {
			profession: savorSwipea,
			profile: savorSwipej
		},
		link: 'https://savorswipe.hatstack.fun',
		github: 'https://github.com/HatmanStack/savorswipe',
		buttonText: 'Eat'
	},
	{
		id: 'local-nano',
		title: 'Local Nano',
		description:
			'DOM-aware Chrome extension with a fully local AI assistant. Highlight text and an on-device model rewrites it in place, or ask about the page and it answers from the page itself. Runs on Transformers.js and WebGPU, so nothing leaves your machine.',
		category: 'Web',
		images: {
			profession: localNanoa,
			profile: localNanoj
		},
		link: 'https://chromewebstore.google.com/detail/local-nano/ilcmgldolaplehcdgmbgofkbenlmekpe',
		github: 'https://github.com/HatmanStack/local-nano',
		buttonText: 'Rewrite'
	}
];
