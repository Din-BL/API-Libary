export { MakeObj, container };

let favorite = document.querySelector(".favorite");
const favoriteLink = document.querySelector("#favoriteLink");
let container = document.querySelector(".grid");
let counter = 0;
let favoritePic = [];

favoriteLink.addEventListener('click', () => {
  if (favoritePic.length > 0) {
    const stringify = JSON.stringify(favoritePic);
    localStorage.setItem("favorite", stringify);
  }
});

class MakeObj {
  constructor(img) {
    this.img = img;
  }

  render() {
    const imgContainer = document.createElement("div");
    const myImg = document.createElement("img");
    myImg.classList.add("frame");
    myImg.src = this.img;
    container.append(imgContainer);
    imgContainer.append(myImg);
    imgContainer.addEventListener("click", (e) => {
      if (imgContainer.childNodes.length < 2) {
        counter++;
        favorite.innerText = counter;
        const selected = document.createElement("span");
        selected.classList.add("span");
        selected.innerText = "Selected";
        imgContainer.append(selected);
        favoritePic.push(e.target.src);
      } else {
        if (e.target.tagName.toLowerCase() === 'span') {
          const parent = e.target.parentNode
          favoritePic = favoritePic.filter(show => show !== parent.childNodes[0].src);
        } else {
          favoritePic = favoritePic.filter(show => show !== e.target.src);
        }
        counter--;
        favorite.innerText = counter;
        imgContainer.children[1].remove()
      }
    });
  }
}
