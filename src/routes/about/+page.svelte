<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script>
  import linkedIn from '$lib/images/linkedIn.svg';
  import huggingface from '$lib/images/hf.svg';
  import x from '$lib/images/x.svg';
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


