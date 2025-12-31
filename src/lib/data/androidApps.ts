// Android apps data
import type { AndroidApp } from '$lib/types/index.js';
import trachtenberg from '$lib/images/trachtenberg.avif';
import stock from '$lib/images/stock.avif';
import movies from '$lib/images/movies.avif';
import vocab from '$lib/images/vocabulary.avif';
import looper from '$lib/images/looper.avif';
import italian from '$lib/images/italian.avif';
import trachtenbergs from '$lib/images/trachtenberg.svg';
import stocks from '$lib/images/stock.jpg';
import moviess from '$lib/images/movies.jpg';
import vocabs from '$lib/images/vocabulary.svg';
import loopers from '$lib/images/looper.jpg';
import italians from '$lib/images/italian.svg';

export const androidApps: AndroidApp[] = [
  {
    id: 'looper',
    title: 'Looper',
    link: 'https://play.google.com/store/apps/details?id=gemenielabs.looper&pli=1',
    webLink: 'https://looper.hatstack.fun',
    description: 'Audio looper with record/import, per-track controls (stop/pause/delete), volume/speed sliders, and local file saving.',
    initialImg: loopers,
    activeImg: looper
  },
  {
    id: 'vocabulary',
    title: 'Vocabulary',
    link: 'https://play.google.com/store/apps/details?id=gemenielabs.vocabulary',
    webLink: 'https://vocabulary.hatstack.fun',
    description: '300+ word vocabulary builder. Multiple choice and fill-in-the-blank formats with per-list progress tracking and persistent high scores.',
    initialImg: vocabs,
    activeImg: vocab
  },
  {
    id: 'trachtenberg',
    title: 'Trachtenberg',
    link: 'https://play.google.com/store/apps/details?id=trachtenberg.math.trachtenberg',
    webLink: 'https://trachtenberg.hatstack.fun',
    description: 'Learn the Trachtenberg multiplication method. Practice mode with optional hints.',
    initialImg: trachtenbergs,
    activeImg: trachtenberg
  },
  {
    id: 'movies',
    title: 'Movies',
    link: 'https://play.google.com/store/apps/details?id=gemenielabs.movies',
    webLink: 'https://movies.hatstack.fun',
    description: 'TMDB client demonstrating Android LiveData and Room. On-device database syncs with web data in real-time.',
    initialImg: moviess,
    activeImg: movies
  },
  {
    id: 'stocks',
    title: 'Stocks',
    link: 'https://play.google.com/store/apps/details?id=gemenielabs.sentiment',
    description: 'NLP sentiment analysis on news articles combined with price/volume data. Multivariate logistic regression forecasts via serverless backend. (update pending)',
    initialImg: stocks,
    activeImg: stock
  },
  {
    id: 'italian',
    title: 'Italian',
    link: 'https://play.google.com/store/apps/details?id=gemenielabs.italian',
    description: 'Restaurant PoC with menu/nutrition info, location search, and custom map markers showing hours and contact details. (Deprecated)',
    initialImg: italians,
    activeImg: italian
  }
];

export const androidContentMap = androidApps.reduce((acc, app) => {
  acc[app.title] = app;
  return acc;
}, { 'Android Stuff': { title: 'Android Stuff' } } as Record<string, any>);