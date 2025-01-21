<script>
  import { onMount } from 'svelte';
  import Swiper from 'swiper';
  import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';

  let swiper;

  onMount(() => {
    swiper = new Swiper('.swiper', {
      modules: [Navigation, Pagination, Mousewheel],
      grabCursor: true,
      initialSlide: 4,
      centeredSlides: true,
      slidesPerView: "auto",
      spaceBetween: 10,
      speed: 1000,
      freeMode: false,
      mousewheel: {
        thresholdDelta: 30,
      },
      pagination: {
        el: ".swiper-pagination",
      },
      on: {
        click(event) {
          swiper.slideTo(this.clickedIndex);
        },
      },
    });
  });
</script>

<svelte:head>
    <title>About</title>
    <meta name="description" content="About this app" />
</svelte:head>

<section>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/c91f906b-5881-47b1-89e4-e4a69c1961a7" />
        <p>Lucas</p>
      </div>
      <div class="swiper-slide">
        <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/5bc859f0-db4f-4ab4-8f5f-e55977c33eb1" />
        <p>Mike</p>
      </div>
      <div class="swiper-slide">
        <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/d239a63a-a0f8-4213-82dc-bb8d3f0806db" />
        <p>Max</p>
      </div>
      <div class="swiper-slide">
        <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/9c0637aa-b440-4aef-93f3-ea20cf19f42c" />
        <p>Will</p>
      </div>
      <div class="swiper-slide">
        <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/6a90b5ba-9f3e-4cb3-a8e2-3ae19b2aa443" />
        <p>Eleven</p>
      </div>
      <div class="swiper-slide">
        <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/fe05145f-c9ab-457f-a91b-92a4c1bd633c" />
        <p>Dustin</p>
      </div>
      <div class="swiper-slide">
        <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/1158c3d4-81d5-4dfc-bb42-863f357ecdb5" />
        <p>Eddie Munson</p>
      </div>
      <div class="swiper-slide">
        <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/c8ef23d2-37ee-4473-ad86-d9c9911be3bb" />
        <p>Steve</p>
      </div>
      <div class="swiper-slide">
        <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/29eff421-1087-4b51-92a2-a7f204098187" />
        <p>Robin</p>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</section>

<style>
.swiper-slide {
  position: relative;
  width: 200px;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  user-select: none;
}

.swiper-slide::after {
  content: "";
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    rgba(130, 13, 13, 0.8),
    rgba(39, 8, 92, 0.8)
  );
  mix-blend-mode: multiply;
  z-index: 1;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.swiper-slide-active {
  transform: scale(1.2);
  z-index: 2;
}

.swiper-slide-active img {
  transform: scale(1.3);
  z-index: 2;
}
</style>