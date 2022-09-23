import renderCard from "./renderCard";

const goSentinel = document.querySelector('#sentinel');

window.addEventListener('scroll', trackScroll);

export function trackScroll() {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;
  
    if (scrolled > coords) {
      goTopBtn.classList.add('back-to-top-show');
    }
    if (scrolled < coords) {
      goTopBtn.classList.remove('back-to-top-show');
    }
  }
  export function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }


  const observer = new IntersectionObserver(renderCard, option);
  observer.observe(goSentinel);




