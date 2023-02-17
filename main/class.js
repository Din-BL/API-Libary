export { MakeObj, container };

const container = document.createElement("div");
document.body.append(container);
let counter = 0;
let favorite = document.querySelector(".favorite");
let favoritePic = [];

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
        let myFavorite = document.createElement("span");
        imgContainer.append(myFavorite);
      }

      if (imgContainer.childNodes.length < 3) {
        const selected = document.createElement("span");
        selected.classList.add("span");
        selected.innerText = "Selected";
        imgContainer.append(selected);
      }
      let selectedPic = e.target.src;
      favoritePic.push(selectedPic);
      let stringify = JSON.stringify(favoritePic);
      localStorage.setItem("favorite", stringify);
    });
  }
}
