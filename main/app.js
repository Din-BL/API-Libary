import {MakeObj, container, resetShows} from './class.js';

const form = document.querySelector('form');
const reset = document.querySelector('#reset');
const submit = document.querySelector('.submit');
const favorite = document.querySelector('.favorite');
const bodyElement = document.body;
let flag = 0;

window.addEventListener('resize', handleResize);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  localStorage.clear();
  let searchTerm = form.elements.query.value;
  if (searchTerm !== '') {
    try {
      const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
      if (res.data.length == 0) throw new Error('Empty list');
      bodyBG();
      makeTvShow(res.data);
      submit.disabled = true;
      localStorage.setItem('query', searchTerm);
      container.style.display = 'grid';
      window.location.href = '#shows';
    } catch (error) {
      console.error(error);
    }
    searchTerm = '';
  }
});

reset.addEventListener('click', () => {
  bodyElement.style.backgroundImage = 'url("./assets/TvShow.jpg")';
  container.style.display = 'none';
  favorite.innerHTML = '0';
  removeAllChildren(container);
  container.style.display = 'none';
  form.elements.query.value = '';
  submit.disabled = false;
  flag = 0;
  localStorage.clear();
  resetShows();
});

const bodyBG = () => (bodyElement.style.backgroundImage = window.innerWidth > 990 ? 'url("./assets/frame.jpg")' : 'url("./assets/SmallBG.jpg")');

function handleResize() {
  const bodyStyle = window.getComputedStyle(bodyElement);
  const backgroundImage = bodyStyle.getPropertyValue('background-image');
  !backgroundImage.includes('TvShow') && bodyBG();
}

const makeTvShow = (data) => {
  for (let index of data) {
    flag++;
    if (index.show.image) {
      const tvShow = new MakeObj(index.show.image.medium);
      tvShow.render();
      if (flag > 7) break;
    } else continue;
  }
};

function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
