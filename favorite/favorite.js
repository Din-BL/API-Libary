let storedPic = localStorage.getItem("favorite");
let queryString = localStorage.getItem("queryString");
let picId = JSON.parse(storedPic);
let query = JSON.parse(queryString);
const table = document.querySelector("table");
const article = document.querySelector("article");
const main = document.querySelector("main");

const getData = async () => {
  try {
    const data = await fetch(`https://api.tvmaze.com/search/shows?q=${query.params.q}`);
    const parsed = await data.json();
    const newData = filteredData(parsed, picId);
    for (const data of newData) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <tbody>
      <td>${data.show.name}</td>
      <td>${data.show.type}</td>
      <td>${data.show.language}</td>
      <td>${data.show.rating.average ? data.show.rating.average : "No Data Available"}</td>
      <td><a href="${data.show.url}">Details</a></td>
      </tbody>`;
      table.append(tr);
    }
  } catch (error) {
    article.remove()
    const Error = document.createElement("h1");
    Error.innerHTML = 'No TV Shows Available'
    Error.className = 'text-center error'
    main.append(Error);
  }
};

const filteredData = (api, imgList) => {
  const newData = api.filter((obj) => {
    if (obj.show.image !== null) {
      for (const img of imgList) {
        if (obj.show.image.medium === img) {
          return obj.show.image.medium;
        }
      }
    }
  });
  return newData;
};

getData();
