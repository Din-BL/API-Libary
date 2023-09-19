import { MakeObj, container } from "./class.js";

const form = document.querySelector("#searchForm");
const input = document.querySelector("input");
const reset = document.querySelector("#reset");
const submit = document.querySelector(".submit");
const favorite = document.querySelector(".favorite");
const bodyElement = document.body;

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  if (input.value !== "") {
    submit.disabled = true;
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } };
    const q_value = JSON.stringify(config);
    localStorage.setItem("queryString", q_value);
    const screenWidth = window.innerWidth;
    if (screenWidth > 990) {
      bodyElement.style.backgroundImage = 'url("./img/frame.jpg")';
    } else {
      bodyElement.style.backgroundImage = 'url("./img/SmallBG.jpg")';
    }
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    const apiData = res.data;
    container.style.display = 'grid'
    window.location.href = "#shows";
    createObj(apiData);
    form.elements.query.value = "";
  }
});

let flag = 0;
const createObj = (data) => {
  for (let index of data) {
    flag++;
    if (index.show.image !== null) {
      const newObj = new MakeObj(index.show.image.medium);
      newObj.render();
      if (flag > 8) {
        break;
      }
    } else continue;
  }
};

function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// Reset Button
reset.addEventListener("click", (e) => {
  e.preventDefault();
  bodyElement.style.backgroundImage = 'url("./img/TvShow.jpg")';
  container.style.display = 'none'
  favorite.innerHTML = '0'
  removeAllChildren(container)
  container.style.display = 'none'
  form.elements.query.value = "";
  submit.disabled = false;
  flag = 0;
  localStorage.clear()
});
