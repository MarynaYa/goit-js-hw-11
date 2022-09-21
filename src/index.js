import './sass/index.scss';

import NewsApiService from './js/appi-service';
import renderCard from './js/renderCard';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
  };
  
  const newsApiService = new NewsApiService();
  
  refs.searchForm.addEventListener('submit', onSearch);
  refs.loadMoreBtn.addEventListener('click', onLoadMore);
  
  function onSearch(e) {
    e.preventDefault();
  
    newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
    newsApiService.resetPage();
  
    if (newsApiService.query === '') {
        Notify.warning('Please, fill the main field');
        refs.galleryContainer.innerHTML = '';
      refs.loadMoreBtn.classList.add('is-hidden'); 
     return;
    }
  
    newsApiService.fetchGalleryCards()   
      .then(data => {
        refs.galleryContainer.innerHTML = '';
        refs.loadMoreBtn.classList.remove('is-hidden');
  
        if (!data.hits.length) {
          Notify.warning(
            `Sorry, there are no images matching your search query. Please try again.`,
          );
          refs.loadMoreBtn.classList.add('is-hidden');
          return;
        }
  
        onRenderGallery(data);
        Notify.success(`Hooray! We found ${data.totalHits} images !!!`);
      });
  }
  
  function onLoadMore() {
    newsApiService.fetchGalleryCards().then(onScrollmake);
  }
  

  function  onRenderGallery(data) {        
    refs.galleryContainer.insertAdjacentHTML('beforeend',renderCard(data));
  
  }
  
  function onScrollmake(data) {

  }
