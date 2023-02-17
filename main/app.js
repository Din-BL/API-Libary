import { MakeObj, container } from "./class.js";

const form = document.querySelector("#searchForm");
const reset = document.querySelector("#reset");
const submit = document.querySelector(".submit");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  submit.disabled = true;
  const searchTerm = form.elements.query.value;
  const config = { params: { q: searchTerm } };
  const q_value = JSON.stringify(config);
  localStorage.setItem("queryString", q_value);

  const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
  const apiData = res.data;
  container.classList.add("grid");
  container.id = "shows";
  window.location.href = "#shows";
  createObj(apiData);
  form.elements.query.value = "";
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

// Reset Button
reset.addEventListener("click", (e) => {
  e.preventDefault();
  container.innerHTML = "";
  form.elements.query.value = "";
  submit.disabled = false;
  flag = 0;
});
