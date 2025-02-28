<svelte:head>
	<title>Read</title>
	<meta name="description" content="stuff to Read" />
</svelte:head>

<script>
  import Header from '../Header.svelte';
   export let data;
    
</script>

<section>
  <Header />
</section>

<section>
  <div class="wrapper-column">
    <h1 class="header-text glow-filter" data-text="Blog Stuff"></h1>
    <div class="articles-list">
  {#each data.posts as post}
    <a href="/read/post/{post.slug}" class="article-link">
      <div class="article-card">
        <div class="card-header">
          <h2>{post.title}</h2>
          <p class="date">{post.date}</p>
        </div>
        <div class="card-content">
          <p class="description">{post.description}</p>
          <p class="time">{post.time}</p>
        </div>
      </div>
    </a>
  {/each}
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

 
 .card-header h2 {
  color: #000000;
  font-size: 1.5rem;
  margin: 0;
  flex: 1;
  white-space: normal;  
  text-align: center;  
  margin-right: 1rem;   
  line-height: 1.3;   
  text-wrap: balanced;  
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;  /* Align items to top when title wraps */
  margin-bottom: 1rem;
  min-height: 2.5rem;
}



  .card-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  .card-content .description {
    flex: 1;
    margin: 0;
  }

  .card-content .time {
    font-size: 0.9rem;
    white-space: nowrap;
    margin: 0;
  }

 .articles-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  .article-link {
    text-decoration: none;
    color: inherit;
  }

  .article-card {
    padding: .6rem;
    border-radius: var(--border-radius);
    background: rgba(255, 255, 255, 0.03);
    transition: transform 0.3s ease, background 0.3s ease;
  }

  .article-card:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.2);
  }

  .article-card h2 {
    color:rgb(51, 51, 51);
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .article-card p {
    color:rgb(51, 51, 51);
    font-size: .8rem;
    text-align: left;
  }

.wrapper-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
}

.glow-filter {
   display: flex; 
    justify-content: center; 
    align-items: center; 
  animation: onloadscale 1s ease-out forwards;
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


</style>
