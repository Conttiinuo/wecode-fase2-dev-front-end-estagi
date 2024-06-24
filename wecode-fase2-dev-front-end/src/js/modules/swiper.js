// Swiper config
export function swipers() {
  const swiperPrincipal = new Swiper('#swiper-principal', {
    cssMode: true,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '#pagination-principal',
      clickable: true,
    },
    keyboard: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });
}
