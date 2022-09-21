export default function renderCard(data) {
const markupCard = data.map(  img => `<div class="photo-card">
<a href="${img.largeImageURL}">
  <img class="photo-img" src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
</a>
<div class="info">
  <p class="info-item">
    <b>Likes</b>
    ${img.likes}
  </p>
  <p class="info-item">
    <b>Views</b>
    ${img.views}
  </p>
  <p class="info-item">
    <b>Comments</b>
    ${img.comments}
  </p>
  <p class="info-item">
    <b>Downloads</b>
    ${img.downloads}
  </p>
</div>
</div>`
)
.join('');

refs.galleryContainer.insertAdjacentHTML('beforeend', markupCard);
}