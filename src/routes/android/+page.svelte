<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script>
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

  let selectedImage = 'Android Stuff'; 
  const contentMap = {
    'Android Stuff':{ title: 'Android Stuff'},
    'Looper': { title: 'Looper', link: 'https://play.google.com/store/apps/details?id=gemenielabs.looper&pli=1', description: 'An audio looping application. Create tracks by pressing the record/stop buttons or import from your own library of audio files. Every list item has independent stop/pause/delete buttons with volume/speed sliders. You can save edited files to your device.' },
    'Vocabulary': { title: 'Vocabulary', link: 'https://play.google.com/store/apps/details?id=builder.vocabulary.vocabularybuilder', description: 'Vocabulary builder with 300+ words. Questions are given in either multiple choice or fill in the blank format. Progress is kept independently within each list and rank. After completing the rank your top score persists based on wrong answers and hints accumulated.' },
    'Trachtenberg': { title: 'Trachtenberg', link: 'https://play.google.com/store/apps/details?id=trachtenberg.math.trachtenberg', description: 'An educational app to teach the Trachtenberg method of multiplication. The practice activity can use ads to monetize the content. Hints can be turned off or on through settings.' },
    'Movies': { title: 'Movies', link: 'https://play.google.com/store/apps/details?id=gemenielabs.movies', description: 'Movies uses The Movie DataBase to showcase LiveData and Room persistence libraries in Android. It creates a database on device with web data that can be manipulated and changed in real-time.' },
    'Stocks': { title: 'Stocks', link: 'https://play.google.com/store/apps/details?id=gemenielabs.sentiment', description: 'Stocks uses a custom bag-of-words strategy and natural language processing (NLP) for sentiment analysis to analyze news articles. This is combined with other metrics, such as price and volume, to employ multivariate logistic regression to forecast market movements over varied time frames. These calculations are conducted off-device through serverless microservices. (update pending)' },
    'Italian': { title: 'Italian', link: 'https://play.google.com/store/apps/details?id=gemenielabs.italian', description: 'This is a proof of concept app for an Italian restaurant. It provides menu and nutritional information with an ability to pick items from a menu with pricing. Local location information is searched for and presented in custom map markers. The map markers open windows that display the restaurants location information and open/close status. Once the window is clicked a screen displaying the restaurant’s phone number and hours of operation is displayed. (No longer supported)' }
  };
</script>

<section>
  <fieldset>
    <label style="--initial-img: url({loopers}); --active-img: url({looper});">
       <input type="radio" name="images" on:change="{() => selectedImage = 'Looper'}">
    </label>
    <label style="--initial-img: url({vocabs}); --active-img: url({vocab});">
       <input type="radio" name="images" on:change="{() => selectedImage = 'Vocabulary'}">
    </label>
    <label style="--initial-img: url({trachtenbergs}); --active-img: url({trachtenberg});">
       <input type="radio" name="images"  on:change="{() => selectedImage = 'Trachtenberg'}">
    </label>
    <label style="--initial-img: url({moviess}); --active-img: url({movies});">
       <input type="radio" name="images"  on:change="{() => selectedImage = 'Movies'}">
    </label>
    <label style="--initial-img: url({stocks}); --active-img: url({stock});">
       <input type="radio" name="images" on:change="{() => selectedImage = 'Stocks'}">
    </label>
    <label style="--initial-img: url({italians}); --active-img: url({italian});">
       <input type="radio" name="images" on:change="{() => selectedImage = 'Italian'}">
    </label>
    <label class="content-label">
  {#if contentMap[selectedImage]}
    <h1 class="header-text glow-filter" data-text={contentMap[selectedImage].title}></h1>
    {#if contentMap[selectedImage].description}
    <p>{contentMap[selectedImage].description}</p>
    {/if}
    {#if contentMap[selectedImage].link}
    <a href={contentMap[selectedImage].link}>
      <button class="button">Other Stuff</button>
    </a>
    {/if}
  {/if}
  
</label>
  </fieldset>
<svg class="filters" width='1440px' height='300px' viewBox='0 0 1440 300' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <filter id="glow-4" color-interpolation-filters="sRGB" x="-50%" y="-200%" width="200%" Height="500%">
            <feGaussianBlur in="SourceGraphic" data-target-blur="4" stdDeviation="4" result="blur4"/>
            <feGaussianBlur in="SourceGraphic" data-target-blur="19" stdDeviation="19" result="blur19"/>
            <feGaussianBlur in="SourceGraphic" data-target-blur="9" stdDeviation="9" result="blur9"/>
            <feGaussianBlur in="SourceGraphic" data-target-blur="30" stdDeviation="30" result="blur30"/>
            <feColorMatrix in="blur4" result="color-0-blur" type="matrix" values="1 0 0 0 0
                      0 0.9803921568627451 0 0 0
                      0 0 0.9647058823529412 0 0
                      0 0 0 0.8 0"/>
            <feOffset in="color-0-blur" result="layer-0-offsetted" dx="0" dy="0" data-target-offset-y="0"/>
            <feColorMatrix in="blur19" result="color-1-blur" type="matrix" values="0.8156862745098039 0 0 0 0
                      0 0.49411764705882355 0 0 0
                      0 0 0.2627450980392157 0 0
                      0 0 0 1 0"/>
            <feOffset in="color-1-blur" result="layer-1-offsetted" dx="0" dy="2" data-target-offset-y="2"/>
            <feColorMatrix in="blur9" result="color-2-blur" type="matrix" values="1 0 0 0 0
                      0 0.6666666666666666 0 0 0
                      0 0 0.36470588235294116 0 0
                      0 0 0 0.65 0"/>
            <feOffset in="color-2-blur" result="layer-2-offsetted" dx="0" dy="2" data-target-offset-y="2"/>
            <feColorMatrix in="blur30" result="color-3-blur" type="matrix" values="1 0 0 0 0
                      0 0.611764705882353 0 0 0
                      0 0 0.39215686274509803 0 0
                      0 0 0 1 0"/>
            <feOffset in="color-3-blur" result="layer-3-offsetted" dx="0" dy="2" data-target-offset-y="2"/>
            <feColorMatrix in="blur30" result="color-4-blur" type="matrix" values="0.4549019607843137 0 0 0 0
                      0 0.16470588235294117 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"/>
            <feOffset in="color-4-blur" result="layer-4-offsetted" dx="0" dy="16" data-target-offset-y="16"/>
            <feColorMatrix in="blur30" result="color-5-blur" type="matrix" values="0.4235294117647059 0 0 0 0
                      0 0.19607843137254902 0 0 0
                      0 0 0.11372549019607843 0 0
                      0 0 0 1 0"/>
            <feOffset in="color-5-blur" result="layer-5-offsetted" dx="0" dy="64" data-target-offset-y="64"/>
            <feColorMatrix in="blur30" result="color-6-blur" type="matrix" values="0.21176470588235294 0 0 0 0
                      0 0.10980392156862745 0 0 0
                      0 0 0.07450980392156863 0 0
                      0 0 0 1 0"/>
            <feOffset in="color-6-blur" result="layer-6-offsetted" dx="0" dy="64" data-target-offset-y="64"/>
            <feColorMatrix in="blur30" result="color-7-blur" type="matrix" values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0.68 0"/>
            <feOffset in="color-7-blur" result="layer-7-offsetted" dx="0" dy="64" data-target-offset-y="64"/>
            <feMerge>
                <feMergeNode in="layer-0-offsetted"/>
                <feMergeNode in="layer-1-offsetted"/>
                <feMergeNode in="layer-2-offsetted"/>
                <feMergeNode in="layer-3-offsetted"/>
                <feMergeNode in="layer-4-offsetted"/>
                <feMergeNode in="layer-5-offsetted"/>
                <feMergeNode in="layer-6-offsetted"/>
                <feMergeNode in="layer-7-offsetted"/>
                <feMergeNode in="layer-0-offsetted"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    </defs>
</svg>

</section>

<style>
@import "https://unpkg.com/open-props" layer(design.system);


@layer android {
  :root {
  --primary-color: #6200ea;
  --secondary-color: #03dac6;
  --background-color: #1e1e1e;
  --text-color: #61676b;
  --accent-color: #9fa5a9;
  --modal-background: rgba(0, 0, 0, 0.8);
  --transition-speed: 0.3s;
  --border-radius: 12px;
  --box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}


.button {
  background: transparent;
  border: 2px solid var(--accent-color);
  color: var(--accent-color);
  position: relative;
  border-radius: var(--border-radius);
  font-size: 12px;
  cursor: pointer;
  overflow: hidden;
  text-transform: uppercase;
  transition: color var(--transition-speed), background var(--transition-speed);
}

.button::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: -100%;
  background: var(--accent-color);
  z-index: -1;
  transition: all var(--transition-speed);
}

.button:hover::before {
  left: 0;
}

.button:hover {
  color: var(--text-color);
}

  fieldset {
    display: grid;
    width: 100vw;
    max-width: 100%; 
    grid-template-columns: 
      var(--col-1, 1fr) 
      var(--col-2, 1fr) 
      var(--col-3, 1fr) 
      var(--col-4, 1fr) 
      var(--col-5, 1fr)
      var(--col-6, 1fr)
      var(--col-7, 4fr)
    ;
    
    @media (prefers-reduced-motion: no-preference) {
      transition: grid-template-columns 2s var(--ease-spring-5);
    }

        > label {
      background-image: var(--initial-img);
      background-position: center;
      background-size: auto 125%;
      position: relative;
    }

    &:has(label:nth-child(1) > input:checked) {
      --col-1: 5fr;
      --col-2: 3fr;
      label:nth-child(1) {
        background-image: var(--active-img);
        background-size: cover;
        transition: background-image 0.3s ease;
      }
    }
    &:has(label:nth-child(2) > input:checked) {
      --col-1: 2fr;
      --col-2: 5fr;
      --col-3: 2fr;
      label:nth-child(2) {
        background-image: var(--active-img);
        background-size: cover;
        transition: background-image 0.3s ease;
      }
    }
    &:has(label:nth-child(3) > input:checked) {
      --col-2: 2fr;
      --col-3: 5fr;
      --col-4: 2fr;
      label:nth-child(3) {
        background-image: var(--active-img);
        background-size: cover;
        transition: background-image 0.3s ease;
      }
    }
    &:has(label:nth-child(4) > input:checked) {
      --col-3: 2fr;
      --col-4: 5fr;
      --col-5: 2fr;
      label:nth-child(4) {
        background-image: var(--active-img);
        background-size: cover;
        transition: background-image 0.3s ease;
      }
    }
    &:has(label:nth-child(5) > input:checked) {
      --col-4: 2fr;
      --col-5: 5fr;
      --col-6: 2fr;
      label:nth-child(5) {
        background-image: var(--active-img);
        background-size: cover;
        transition: background-image 0.3s ease;
      }
    }
    &:has(label:nth-child(6) > input:checked) {
      --col-5: 3fr;
      --col-6: 5fr;
      label:nth-child(6) {
        background-image: var(--active-img);
        transition: background-image 0.3s ease;
      }
    }

    &:has(label > input:checked) > label > .content {
      display: block;
    }
  }
.content-label {
  display: flex;
  align-items:center;
  flex-direction: column; /* Align children from top to bottom */
  justify-content: space-around; /* Space elements apart */
  height: 100%; /* Assume full height of the container or parent */
}

.glow-filter {
   display: flex; 
    justify-content: center; 
    align-items: center; 
  animation: onloadscale 1s ease-out forwards;
}

p {
  margin: 0; /* Remove default margin */
  color: #86868b;
  font-weight: 600;
  background: linear-gradient(0deg, #86868b 0%, #bdc2c9 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  max-width: 28em;
  text-align: center;
}


svg.filters {
  height: 0;
  width: 0;
  position: absolute;
  z-index: -1;
}

.header-text {
  color: #c8c2bd;
  font-size: 3em;
  text-align: center;
  line-height: 1.0625;
  font-weight: 600;
  letter-spacing: -0.009em;
}

.glow-filter::before {
  content: attr(data-text);
  position: absolute;
  pointer-events: none;
  color: #fffaf6;
  background: linear-gradient(0deg, #dfe5ee 0%, #fffaf6 50%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: url(#glow-4);
  -moz-filter: url(#glow-4);
  -webkit-filter: url(#glow-4);
  opacity: 0;
  animation: onloadopacity 1s ease-out forwards;
}

@keyframes onloadscale {
  24% { scale: 1; }
  100% { scale: 1.02; }
}

@keyframes onloadopacity {
  24% { opacity: 0; }
  100% { opacity: 1; }
}
}

@layer android.support {
  html {
    background: var(--gradient-9);
    block-size: 100%;
  }
  
  body {
    min-block-size: 100%;
    display: grid;
    place-content: center;
    padding: var(--size-5);
    gap: var(--size-5);
  }
  
  fieldset {
    inline-size: 80vw;
    
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: 90vh;
    gap: var(--size-3);
    border: none;
    
    > label {
      cursor: pointer;
      border-radius: var(--radius-4);
      
      &:focus-within {
        outline: 1px solid green;
        outline-offset: 5px;
      }
      
      > input {
        opacity: 0;
      }
    }
  }
}
</style>