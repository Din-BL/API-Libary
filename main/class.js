export { MakeObj, container };

const favoriteLink = document.querySelector("#favoriteLink");
const container = document.querySelector(".grid");
const favorite = document.querySelector(".favorite");
let counter = 0;
let favoriteShow = [];

favoriteLink.addEventListener('click', () => {
  if (favoriteShow.length > 0) {
    const stringify = JSON.stringify(favoriteShow);
    localStorage.setItem("favorite", stringify);
  }
});

class MakeObj {
  constructor(img) {
    this.img = img;
  }
  render() {
    const imgContainer = document.createElement("div");
    container.append(imgContainer);
    const myImg = document.createElement("img");
    myImg.classList.add("frame");
    myImg.src = this.img;
    imgContainer.append(myImg);
    // Pick favorite show
    imgContainer.addEventListener("click", (e) => {
      if (imgContainer.childNodes.length < 2) {
        counter++;
        favorite.innerText = counter;
        const selected = document.createElement("span");
        selected.classList.add("span");
        selected.innerText = "Selected";
        imgContainer.append(selected);
        favoriteShow.push(e.target.src);
      } else {
        if (e.target.tagName.toLowerCase() === 'span') {
          const parent = e.target.parentNode
          favoriteShow = favoriteShow.filter(show => show !== parent.childNodes[0].src);
        } else {
          favoriteShow = favoriteShow.filter(show => show !== e.target.src);
        }
        counter--;
        favorite.innerText = counter;
        imgContainer.children[1].remove()
      }
    });
  }
}
