<svelte:head>
	<title>Read</title>
	<meta name="description" content="stuff to Read" />
</svelte:head>

<script>
 
  import canvasMediuma from '$lib/images/canvas-medium.avif';
  import ppMediuma from '$lib/images/pp-medium.avif';
  import connectorMediuma from '$lib/images/connector-medium.avif';
  import hugMediuma from '$lib/images/hug-medium.avif';
  import studioBrowsera from '$lib/images/as-medium.avif';
 



  import nine from '$lib/images/slices/9.jpg';
  import ten from '$lib/images/slices/10.jpg';
  import eleven from '$lib/images/slices/11.jpg';
  import twelve from '$lib/images/slices/12.jpg';
  import thirteen from '$lib/images/slices/13.jpg';

 let selectedImage = 'Splash'; 
const contentMap = {
    'Splash': { title: 'Blog Stuff'},
    'Canvas Medium': { title: 'Canvas Gone Rogue Art meets chaos, with a side of jailbreak', link: 'https://medium.com/@HatmanStack/aws-nova-canvas-gone-rogue-art-meets-chaos-with-a-side-of-jailbreak-1f4cc2ba7c96', description: 'Challenges encountered when developing the AWS Nova Canvas Gradio App. ' },
    'Plot Palette Medium': { title: 'Creating Plot Palette 100K with Cloud9 for LLM Training', link: 'https://medium.com/@HatmanStack/creating-plot-palette-100k-with-cloud9-for-llm-training-7a63384ca329', description: 'A how to on managing and executing multi-threaded tasks efficiently despite API limitations, with potential to streamline the process using CloudFormation.' },
    'Connector Medium': { title: 'Connect Google Forms with Snowflake', link: 'https://medium.com/@HatmanStack/connect-google-forms-with-snowflake-ac8a2a6837b', description: 'Seamlessly integrate Google Forms with Snowflake for data transfer with scripts to handle and route form entries securely and efficiently.' },
    'Hug Medium': { title: 'Cloud Bound: Hugging Face Spaces', link: 'https://medium.com/@HatmanStack/cloud-bound-hugging-face-spaces-1101c569690d', description: 'This demo faced issues with Hugging Face Spaces, which can streamline inference pipelines with its API and Docker setup, offering scalable solutions for different project needs.' },
    'AS Medium': { title: 'Android Studio in the Browser', link: 'https://medium.com/@HatmanStack/android-studio-in-the-browser-dcada6243442', description: 'Transform any computer into a powerful Android development machine with reduced backend complexity.' }
  };


  import Header from '../Header.svelte';
</script>

<section>
<Header />
</section>

<section>
<div class="wrapper-column">
  {#if contentMap[selectedImage]}
    <h1 class="header-text glow-filter" data-text={contentMap[selectedImage].title} style="margin-bottom: {selectedImage.includes('Splash') ? '10rem' : '0'}"></h1>
    {#if contentMap[selectedImage].description}
    <p style="margin-bottom: {selectedImage.includes('Medium') ? '3rem' : '0'};margin-top: {selectedImage.includes('Medium') ? '4rem' : '2rem'}; text-wrap:balanced;">
    {@html contentMap[selectedImage].description}</p>
    {/if}    
    {#if contentMap[selectedImage].link}
      <a href={contentMap[selectedImage].link} target="_blank" rel="noopener noreferrer">
        <button class="button">More Stuff</button>
      </a>
    {/if}
  {/if}
<div class="wrapper">
  <div class="items">
 

    <div class="item" tabindex="0" role="button" style="--initial-img: url({nine}); --active-img: url({canvasMediuma});"  on:click="{(event) => selectedImage === 'Canvas Medium' ? (selectedImage = 'Splash', event.target.blur()) : selectedImage = 'Canvas Medium'}"></div>
    <div class="item" tabindex="0" role="button" style="--initial-img: url({ten}); --active-img: url({ppMediuma});"  on:click="{(event) => selectedImage === 'Plot Palette Medium' ? (selectedImage = 'Splash', event.target.blur()) : selectedImage = 'Plot Palette Medium'}"></div>
    <div class="item" tabindex="0" role="button" style="--initial-img: url({eleven}); --active-img: url({connectorMediuma});"  on:click="{(event) => selectedImage === 'Connector Medium' ? (selectedImage = 'Splash', event.target.blur()) : selectedImage = 'Connector Medium'}"></div>
    <div class="item" tabindex="0" role="button" style="--initial-img: url({twelve}); --active-img: url({hugMediuma});"  on:click="{(event) => selectedImage === 'Hug Medium' ? (selectedImage = 'Splash', event.target.blur()) : selectedImage = 'Hug Medium'}"></div>
    <div class="item" tabindex="0" role="button" style="--initial-img: url({thirteen}); --active-img: url({studioBrowsera});"  on:click="{(event) => selectedImage === 'AS Medium' ? (selectedImage = 'Splash', event.target.blur()) : selectedImage = 'AS Medium'}"></div>


    </div>
      
    </div>
    </div>
</section>
<section>
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
:root {
  --text-color: #aaaa9f;
  --accent-color: #4c4b43;
  --transition-speed: 0.3s;
  --border-radius: 12px;
  --box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  --index: calc(1vw + 1vh);
    --transition: cubic-bezier(.1, .7, 0, 1);
}

.wrapper-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
}

.wrapper{
    margin-top: 10rem;
}

.glow-filter {
   display: flex; 
    justify-content: center; 
    align-items: center; 
  animation: onloadscale 1s ease-out forwards;
}

p {
  color: #86868b;
  font-weight: 600;
  background: linear-gradient(0deg, #86868b 0%, #bdc2c9 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  max-width: 60em;
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
  white-space: nowrap; 
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

.button {
  padding: 15px 30px;
  color: var(--text-color);
  font-size: 14px;
  border-radius: var(--border-radius);
  transition: color var(--transition-speed), background var(--transition-speed);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: .5rem;
  background: transparent;
  color: var(--accent-color);
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

.items{
    display: flex;
    gap: 0.4rem;
    perspective: calc(var(--index) * 35);
}

.item{
    width: calc(var(--index) * 3);
    height: calc(var(--index) * 12);
    background-color: #222;
    background-size: cover;
    background-position: center;
    cursor: pointer;
    filter: grayscale(1) brightness(.5);
    transition: transform 1.25s var(--transition), filter 3s var(--transition), width 1.25s var(--transition);
    will-change: transform, filter, rotateY, width;
}

.item::before, .item::after{
    content: '';
    position: absolute;
    height: 100%;
    width: 20px;
    right: calc(var(--index) * -1);
}

.item::after{
    left: calc(var(--index) * -1);
}

.items .item:hover{
    filter: inherit;
    transform: translateZ(calc(var(--index) * 10));
}

/*Right*/

.items .item:hover + *{
    filter: inherit;
    transform: translateZ(calc(var(--index) * 8.5)) rotateY(35deg);
    z-index: -1;
}

.items .item:hover + * + *{
    filter: inherit;
    transform: translateZ(calc(var(--index) * 5.6)) rotateY(40deg);
    z-index: -2;
}

.items .item:hover + * + * + *{
    filter: inherit;
    transform: translateZ(calc(var(--index) * 2.5)) rotateY(30deg);
    z-index: -3;
}

.items .item:hover + * + * + * + *{
    filter: inherit;
    transform: translateZ(calc(var(--index) * .6)) rotateY(15deg);
    z-index: -4;
}


/*Left*/

.items .item:has( + :hover){
    filter: inherit;
    transform: translateZ(calc(var(--index) * 8.5)) rotateY(-35deg);
}

.items .item:has( + * + :hover){
    filter: inherit;
    transform: translateZ(calc(var(--index) * 5.6)) rotateY(-40deg);
}

.items .item:has( + * + * + :hover){
    filter: inherit;
    transform: translateZ(calc(var(--index) * 2.5)) rotateY(-30deg);
}

.items .item:has( + * + * + * + :hover){
    filter: inherit;
    transform: translateZ(calc(var(--index) * .6)) rotateY(-15deg);
}

.items .item:active, .items .item:focus {
	width: 28vw;
	filter: inherit;
	z-index: 100;
	transform: translateZ(calc(var(--index) * 10));
    margin: 0 .45vw;
}

.items .item:focus {
  background-image: var(--active-img);
  filter: brightness(1.1); 
  transform: scale(1.9); 
}

.items .item{
  background-image: var(--initial-img);
  
}

</style>
