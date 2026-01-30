<svelte:head>
	<title>About | Christopher Galliart</title>
	<meta name="description" content="Connect with Christopher Galliart - full-stack developer specializing in Android, web development, AWS, and AI/ML. Find me on LinkedIn, Hugging Face, and X." />

	<!-- Open Graph -->
	<meta property="og:type" content="profile" />
	<meta property="og:site_name" content="CG Portfolio" />
	<meta property="og:title" content="About | Christopher Galliart" />
	<meta property="og:description" content="Connect with Christopher Galliart - full-stack developer specializing in Android, web development, AWS, and AI/ML." />
	<meta property="og:url" content="https://portfolio.hatstack.fun/about" />
	<meta property="og:image" content="https://portfolio.hatstack.fun/og-image.jpg" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@HatmanStack" />
	<meta name="twitter:title" content="About | Christopher Galliart" />
	<meta name="twitter:description" content="Connect with Christopher Galliart - full-stack developer specializing in Android, web development, AWS, and AI/ML." />
	<meta name="twitter:image" content="https://portfolio.hatstack.fun/og-image.jpg" />

	<!-- JSON-LD Person -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Person",
		"name": "Christopher Galliart",
		"url": "https://portfolio.hatstack.fun/about",
		"sameAs": [
			"https://www.linkedin.com/in/christopher-galliart-gemenie-labs/",
			"https://huggingface.co/Hatman",
			"https://twitter.com/HatmanStack"
		],
		"jobTitle": "Full-Stack Developer"
	})}</script>`}
</svelte:head>

<script>
  import linkedIn from '$lib/images/link_short.svg';
  import huggingface from '$lib/images/hf.svg';
  import x from '$lib/images/x.svg';
  import calendly from '$lib/images/calendly.svg';
  import Header from '../Header.svelte';
</script>

<section>
<Header />
</section>

<div class="container">
  <section class="about">
    <h1>the Good stuff</h1>
  </section>
  <section class="socials">
    <ul class="social-links">
	<li><a href="https://www.linkedin.com/in/christopher-galliart-gemenie-labs/" target="_blank"><img src={linkedIn} alt="LinkedIn" /></a></li>
	<li><a href="https://huggingface.co/Hatman" target="_blank"><img src={huggingface} alt="Hugging Face" /></a></li>
	<li><a href="https://twitter.com/HatmanStack" target="_blank"><img src={x} alt="X" /></a></li>
  <li><a href="https://calendly.com/christopher-galliart" target="_blank"><img src={calendly} alt="Calendly" /></a></li>
	</ul>
  </section>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
    text-align: center;
	  opacity: 0;
    transform: translateY(20px);
	  animation: fadeIn 1s forwards ease-out;
  }

    @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  h1 {
    margin-bottom: 10px;
  }

  .social-links {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
  }

  .social-links li {
    margin: 0 10px;	
  }

  .social-links img {
    width: 40px; 
    height: 40px;
  }
  
</style>


