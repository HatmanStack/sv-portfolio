import type { Project } from '$lib/types/index.js';
import floata from '$lib/images/float.avif';
import floatj from '$lib/images/float.jpg';
import novaCanvasa from '$lib/images/nova-canvas.avif';
import novaCanvasj from '$lib/images/nova-canvas.jpg';
import savorSwipea from '$lib/images/savorswipe.avif';
import savorSwipej from '$lib/images/savorswipe.jpg';

export const projects: Project[] = [
  {
    id: 'float',
    title: 'Float',
    description: 'Float is a cross-platform meditation app built with React Native and Expo. It uses Google Generative AI, Google TTS, and a library of sound files to create personalized meditation experiences based on user-submitted incidents that have affected them emotionally, which we refer to as "floats". Floats are categorized by emotion and intensity, featuring a timer and a color scheme that convey the duration, summary, and reasoning for the category.',
    category: 'Cross-Platform',
    images: {
      profession: floata,
      profile: floatj
    },
    link: 'https://float-app.fun',
    buttonText: 'Meditate'
  },
  {
    id: 'nova-canvas',
    title: 'Nova Canvas',
    description: 'The AWS Nova Canvas foundation model presented in a gradio app. The model enables users to generate, edit, and refine images through sophisticated tools like text-to-image generation, inpainting, outpainting, and background removal. Users can explore innovative image creation methods, including color-guided content manipulation and image conditioning, providing control over visual design and artistic expression.',
    category: 'Web',
    images: {
      profession: novaCanvasa,
      profile: novaCanvasj
    },
    link: 'https://t7bmxtdc6ojbkd3zgknxe32xdm0oqxkw.lambda-url.us-west-2.on.aws/',
    buttonText: 'Infer'
  },
  {
    id: 'savor-swipe',
    title: 'Savor Swipe',
    description: 'SavorSwipe is a recipe discovery app that lets you swipe through dishes to decide what to make. When adding a recipe, simply take a picture of either the ingredients or the directions. The app uses OpenAI\'s OCR technology to automatically extract the relevant information, then leverages Google\'s Custom Search API to find matching food images. This creates a visual collection of dishes that you can easily swipe through.',
    category: 'Cross-Platform',
    images: {
      profession: savorSwipea,
      profile: savorSwipej
    },
    link: 'https://main.d21v5ak15nf4k9.amplifyapp.com/',
    buttonText: 'Eat'
  }
];