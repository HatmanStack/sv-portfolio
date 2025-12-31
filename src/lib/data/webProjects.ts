// Web projects data
import type { WebProject } from '$lib/types/index.js';
import pixelPrompta from '$lib/images/pixel-prompt.avif';
import twaa from '$lib/images/twa.avif';
import credentialsa from '$lib/images/credentials.avif';
import connectora from '$lib/images/connector.avif';
import plotPalettea from '$lib/images/plotpalette.avif';
import whoamia from '$lib/images/name-check.avif';
import nbaa from '$lib/images/nba.avif';
import novaCanvasa from '$lib/images/nova-canvas.avif';

import one from '$lib/images/slices/1.jpg';
import two from '$lib/images/slices/2.jpg';
import three from '$lib/images/slices/3.jpg';
import four from '$lib/images/slices/4.jpg';
import five from '$lib/images/slices/5.jpg';
import six from '$lib/images/slices/6.jpg';
import seven from '$lib/images/slices/7.jpg';
import eight from '$lib/images/slices/8.jpg';

export const webProjects: WebProject[] = [
  {
    id: 'pixel-prompt',
    title: 'Pixel Prompt',
    link: 'https://production.d2iujulgl0aoba.amplifyapp.com/',
    description: 'AI image generation with React Native and AWS. Switch between diffusion models, apply style/layout modifications via IP Adapter, and explore prompt effects with the built-in generator.',
    initialImg: one,
    activeImg: pixelPrompta
  },
  {
    id: 'twa',
    title: 'The Writers Almanac',
    link: 'https://d6d8ny9p8jhyg.cloudfront.net/',
    description: 'Digital poetry archive inspired by MPR\'s Writer\'s Almanac. Features tsparticles ink-on-paper effect, Whisper audio transcription, and upcoming Llama-powered poem analysis with RAG.',
    initialImg: two,
    activeImg: twaa
  },
  {
    id: 'credentials',
    title: 'Credentials Canvas',
    link: 'https://credentials.hatstack.fun/',
    description: '3D portfolio built with Three.js and React Fiber. Blender-generated scene with Draco compression—phones, lights, arcade controls, and signage are all interactive.',
    initialImg: three,
    activeImg: credentialsa
  },
  {
    id: 'connector',
    title: 'Google Forms to Snowflake Connector',
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSce94QihTjunjBvYzFdalz0mYGhVS6Ngy17uRrXkqLI_Da7nA/viewform?pli=1',
    description: 'Serverless Node.js connector linking Google Forms to Snowflake via App Scripts. Lightweight alternative to Rivery/Fivetran—submissions populate in ~1-2 minutes. Data displays <a href="https://hatmanstack-streamlit-display-app-kicv24.streamlit.app/"><b>HERE</b></a>',
    initialImg: four,
    activeImg: connectora
  },
  {
    id: 'plot-palette',
    title: 'Plot Palette',
    link: 'https://github.com/HatmanStack/plot-palette',
    description: 'HuggingFace dataset (10K/100K) for LLM finetuning. Five task types: Creative Writing, Open Question, Poem, Q&A, and Brainstorm.',
    initialImg: five,
    activeImg: plotPalettea
  },
  {
    id: 'name-check',
    title: 'Name Check',
    link: 'https://github.com/HatmanStack/snow-flask-whoami',
    description: 'Flask + Vega-Lite app comparing serverless cold starts across <a href="https://snow-flask-whoami-gpc-k6cy6vf2la-uc.a.run.app/" target="_blank" rel="noopener noreferrer"><b>GCP</b></a>, <a href="https://l1roun0jr9.execute-api.us-west-1.amazonaws.com/dev" target="_blank" rel="noopener noreferrer"><b>AWS</b></a>, and <a href="https://snow-flask-whoami-az.azurewebsites.net/Home" target="_blank" rel="noopener noreferrer"><b>Azure</b></a>. All three backends share a single Snowflake database.',
    initialImg: six,
    activeImg: whoamia
  },
  {
    id: 'nba',
    title: 'NBA Stats',
    link: 'https://hatmanstack-streamlit-nba-app-dz3nxx.streamlit.app/',
    description: 'Streamlit NBA prediction game. Build dream teams from NBA history and compete against AI squads at four difficulty levels. Keras model trained on 2018 season data. <a href="https://github.com/HatmanStack/streamlit-nba" target="_blank" rel="noopener noreferrer"><b>GitHub</b></a>',
    initialImg: seven,
    activeImg: nbaa
  },
  {
    id: 'nova-canvas',
    title: 'Nova Canvas',
    link: 'https://t7bmxtdc6ojbkd3zgknxe32xdm0oqxkw.lambda-url.us-west-2.on.aws/',
    description: 'AWS Nova Canvas foundation model in a Gradio app. Generate, edit, and refine images with text-to-image, inpainting, outpainting, background removal, color-guided manipulation, and image conditioning.',
    initialImg: eight,
    activeImg: novaCanvasa
  }
];

export const webContentMap = webProjects.reduce((acc, project) => {
  acc[project.title] = project;
  return acc;
}, { 'Splash': { title: 'Web Stuff' } } as Record<string, any>);