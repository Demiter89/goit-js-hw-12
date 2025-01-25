import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createGalleryCardTemplate } from './js/render-functions';
import { fetchImages } from './js/pixabay-api';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1; // Змінна для номера сторінки
let currentQuery = ''; // Змінна для збереження запиту

const onSearchFormSubmit = async event => {
  event.preventDefault();

  currentQuery = event.currentTarget.elements.user_query.value.trim(); // Зберігаємо запит
  if (!currentQuery) {
    iziToast.error({ message: 'Please enter your request', position: 'topRight' });
    resetGallery();
    return;
  }

  resetSearch(); // Очищуємо галерею та скидаємо налаштування
  await loadImages(); // Завантажуємо першу сторінку
};

const loadImages = async () => {
  loader.classList.remove('hidden'); // Показуємо індикатор завантаження

  try {
    const data = await fetchImages(currentQuery, currentPage); // Запит до API

    if (data.total === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query!',
        position: 'topRight',
      });
      resetGallery();
      return;
    }

    const galleryTemplate = data.hits.map(el => createGalleryCardTemplate(el)).join('');
    galleryEl.insertAdjacentHTML('beforeend', galleryTemplate); // Додаємо нові елементи до галереї

    const gallery = new SimpleLightbox('.js-gallery a', {
      captionDelay: 300,
      captionsData: 'alt',
    });
    gallery.refresh();

    toggleLoadMoreButton(data.totalHits); // Оновлюємо стан кнопки Load More

    loader.classList.add('hidden'); // Ховаємо індикатор завантаження
  } catch (err) {
    console.error(err);
    iziToast.error({ message: 'An error occurred. Please try again!', position: 'topRight' });
  }
};

const resetSearch = () => {
  currentPage = 1; // Скидаємо номер сторінки
  resetGallery(); // Очищуємо галерею
};

const resetGallery = () => {
  galleryEl.innerHTML = ''; // Очищуємо галерею
  loadMoreBtn.classList.add('hidden'); // Ховаємо кнопку Load more
};

const toggleLoadMoreButton = totalHits => {
  const totalPages = Math.ceil(totalHits / 15); // Загальна кількість сторінок
  if (galleryEl.children.length === 0 || currentPage >= totalPages) {
    loadMoreBtn.classList.add('hidden');
    if (currentPage >= totalPages && currentPage > 1) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } else {
    loadMoreBtn.classList.remove('hidden');
  }
};

const onLoadMoreClick = async () => {
  currentPage += 1; // Збільшуємо номер сторінки
  await loadImages(); // Завантажуємо нову сторінку
  smoothScroll(); // Плавно прокручуємо сторінку
};

const smoothScroll = () => {
  const { height: cardHeight } = galleryEl.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreClick);

hidden