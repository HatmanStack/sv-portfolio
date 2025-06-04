// Android apps data
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

export interface AndroidApp {
  id: string;
  title: string;
  link?: string;
  description?: string;
  initialImg: string;
  activeImg: string;
}

export const androidApps: AndroidApp[] = [
  {
    id: 'looper',
    title: 'Looper',
    link: 'https://play.google.com/store/apps/details?id=gemenielabs.looper&pli=1',
    description: 'An audio looping application. Create tracks by pressing the record/stop buttons or import from your own library of audio files. Every list item has independent stop/pause/delete buttons with volume/speed sliders. You can save edited files to your device.',
    initialImg: loopers,
    activeImg: looper
  },
  {
    id: 'vocabulary',
    title: 'Vocabulary',
    link: 'https://play.google.com/store/apps/details?id=gemenielabs.vocabulary',
    description: 'Vocabulary builder with 300+ words. Questions are given in either multiple choice or fill in the blank format. Progress is kept independently within each list and rank. After completing the rank your top score persists based on wrong answers and hints accumulated.',
    initialImg: vocabs,
    activeImg: vocab
  },
  {
    id: 'trachtenberg',
    title: 'Trachtenberg',
    link: 'https://play.google.com/store/apps/details?id=trachtenberg.math.trachtenberg',
    description: 'An educational app to teach the Trachtenberg method of multiplication. The practice activity can use ads to monetize the content. Hints can be turned off or on through settings.',
    initialImg: trachtenbergs,
    activeImg: trachtenberg
  },
  {
    id: 'movies',
    title: 'Movies',
    link: 'https://play.google.com/store/apps/details?id=gemenielabs.movies',
    description: 'Movies uses The Movie DataBase to showcase LiveData and Room persistence libraries in Android. It creates a database on device with web data that can be manipulated and changed in real-time.',
    initialImg: moviess,
    activeImg: movies
  },
  {
    id: 'stocks',
    title: 'Stocks',
    link: 'https://play.google.com/store/apps/details?id=gemenielabs.sentiment',
    description: 'Stocks uses a custom bag-of-words strategy and natural language processing (NLP) for sentiment analysis to analyze news articles. This is combined with other metrics, such as price and volume, to employ multivariate logistic regression to forecast market movements over varied time frames. These calculations are conducted off-device through serverless microservices. (update pending)',
    initialImg: stocks,
    activeImg: stock
  },
  {
    id: 'italian',
    title: 'Italian',
    link: 'https://play.google.com/store/apps/details?id=gemenielabs.italian',
    description: 'This is a proof of concept app for an Italian restaurant. It provides menu and nutritional information with an ability to pick items from a menu with pricing. Local location information is searched for and presented in custom map markers. The map markers open windows that display the restaurants location information and open/close status. Once the window is clicked a screen displaying the restaurant\'s phone number and hours of operation is displayed. (No longer supported)',
    initialImg: italians,
    activeImg: italian
  }
];

export const androidContentMap = androidApps.reduce((acc, app) => {
  acc[app.title] = app;
  return acc;
}, { 'Android Stuff': { title: 'Android Stuff' } } as Record<string, any>);