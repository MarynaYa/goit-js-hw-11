import './sass/index.scss';

import NewsApiService from './js/api-service';
import renderCard from './js/renderCard';
import { lightbox } from './js/onslidermake';
//import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),  
  loadMoreBtn: document.querySelector('.load-more'),   
};

   const newsApiService = new NewsApiService();
    
  refs.searchForm.addEventListener('submit', onSearch);
  refs.loadMoreBtn.addEventListener('click', onLoadMore);


      //////---- FUNCTION ----////
   function onSearch(e) {
     e.preventDefault();    
     refs.galleryContainer.innerHTML = '';      
         
     newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
     newsApiService.resetPage();
   
     if (newsApiService.query === '') {
         Notify.warning('Please, fill the main field');  
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
         lightbox.refresh();
       });
   }
   // ф-ция кнопки, которая добавляет картинки (onScrollmake)
   async function onLoadMore() {  
   newsApiService.fetchGalleryCards().then(onScrollmake);
  }
   
 // ф-ция рендерит массив (дата) картинок согласно разметки (renderCard)
   function  onRenderGallery(data) {     
     const markup = data.hits.map(data => renderCard(data)).join('');
          refs.galleryContainer.insertAdjacentHTML('beforeend', markup);      
   }
   
  // ф-ция скролла для дальнейшего открытия картинок *более 40 шт)
  function onScrollmake(data) {
    onRenderGallery(data);
 
   lightbox.refresh();
 
   const { height: cardHeight } = document
     .querySelector(".gallery")
     .firstElementChild.getBoundingClientRect();
   
   window.scrollBy({
     top: cardHeight * 2,
     behavior: "smooth",
   });
 
   if (data.hits.length < 40 && data.hits.length > 0) {
     refs.loadMoreBtn.classList.add('is-hidden');
     newsApiService.incrementPage();
     Notiflix.info("We're sorry, but you've reached the end of search results.");
   }
 }
 // функция бесконечного скрола 
  // вешаем слушателя на вьюпор  
  const options = {
    rootMargin: '50px',
    root: null,
    threshold: 0.3
  };
  // регистрируем IntersectionObserver
const observer = new IntersectionObserver(onLoadMore, options);
observer.observe(refs.loadMoreBtn); 
 