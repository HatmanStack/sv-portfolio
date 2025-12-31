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

export const projects: Project[] = [
  {
    id: 'float',
    title: 'Float',
    description: 'Cross-platform meditation app using Google Generative AI and TTS. Submit emotional incidents ("floats") to generate personalized meditations categorized by emotion and intensity.',
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
    id: 'hold-that-thought',
    title: 'Hold That Thought',
    description: 'Private family platform for sharing letters, photos, and memories. AI-powered transcription, shared gallery, and RAG backend for semantic search and chat.',
    category: 'Web',
    images: {
      profession: htta,
      profile: httj
    },
    link: 'https://showcase-htt.hatstack.fun',
    github: 'https://github.com/HatmanStack/hold-that-thought',
    buttonText: 'Link'
  },
  {
    id: 'savor-swipe',
    title: 'Savor Swipe',
    description: 'Recipe discovery app with swipe interface. Photograph ingredients or directions—OpenAI OCR extracts the info, Google Search finds matching food images.',
    category: 'Cross-Platform',
    images: {
      profession: savorSwipea,
      profile: savorSwipej
    },
    link: 'https://savorswipe.hatstack.fun',
    github: 'https://github.com/HatmanStack/savorswipe',
    buttonText: 'Eat'
  }
];

export const projectsRow2: Project[] = [
  {
    id: 'vocabulary',
    title: 'Vocabulary',
    description: '300+ word vocabulary builder. Multiple choice and fill-in-the-blank formats with per-list progress tracking and persistent high scores.',
    category: 'Cross-Platform',
    images: {
      profession: vocaba,
      profile: vocabs
    },
    link: 'https://vocabulary.hatstack.fun',
    github: 'https://github.com/HatmanStack/react-vocabulary',
    buttonText: 'Learn'
  },
  {
    id: 'ragstack',
    title: 'RAGStack',
    description: 'Serverless document processing with AI chat. Upload docs, OCR extraction, query via Amazon Bedrock. One-click AWS deploy. Login: guest@hatstack.fun / Guest@123',
    category: 'AWS',
    images: {
      profession: ragstacka,
      profile: ragstackj
    },
    link: 'https://dhrmkxyt1t9pb.cloudfront.net/login',
    github: 'https://github.com/HatmanStack/RAGStack-Lambda',
    buttonText: 'RAG'
  }
];