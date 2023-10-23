const storedPic = localStorage.getItem("favorite");
const picId = JSON.parse(storedPic);
const query = localStorage.getItem("query");
const table = document.querySelector("table");
const article = document.querySelector("article");
const main = document.querySelector("main");

const getData = async () => {
  try {
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const data = await res.json();
    const favoriteData = filteredData(data, picId);
    for (const data of favoriteData) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <tbody>
      <td>${data.show.name}</td>
      <td>${data.show.type}</td>
      <td>${data.show.language}</td>
      <td>${data.show.rating.average ? data.show.rating.average : "No data available"}</td>
      <td><a href="${data.show.url}">Details</a></td>
      </tbody>`;
      table.append(tr);
    }
  } catch (error) {
    article.remove()
    const Error = document.createElement("div");
    Error.innerHTML = 'No TV Shows Available'
    Error.className = 'text-center'
    Error.style.fontFamily = 'cursive'
    main.append(Error);
  }
};

const filteredData = (api, imgList) => {
  return api.filter(obj => {
    if (obj.show.image) {
      for (const img of imgList) {
        if (obj.show.image.medium === img) {
          return obj.show.image.medium;
        }
      }
    }
  });
};

getData();
