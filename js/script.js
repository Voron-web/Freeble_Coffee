const favoriteLine = document.querySelector(".favorite__slider-line");
const favoriteCards = document.getElementsByClassName("favorite__cart");
const favoriteRightButton = document.querySelector(".favorite__right-button");
const favoriteLeftButton = document.querySelector(".favorite__left-button");
// const favoriteLineStartPosition = parseInt(getComputedStyle(favoriteLine).left);
// const favoriteLineStartPosition = getComputedStyle(favoriteLine).transform;

let favoritePage = 0;
let favoriteMaxPage = favoriteCards.length / 2 - 1;
let favoritePagelenght = document.querySelector(".favorite__cart").clientWidth + parseInt(getComputedStyle(favoriteLine).columnGap);
let cursorPositionStart;
let favoriteMoveble = false;

favoriteLine.ondragstart = function () {
   return false;
};
favoriteLine.onpointermove = function () {
   return false;
};

let moveSliderLine = function (slider, page, lenght) {
   const style = window.getComputedStyle(slider);
   const posX = parseInt(style.getPropertyValue("--positionX"));
   console.log(posX);
   let moveX = -page * lenght;
   console.log(moveX);
   slider.style.setProperty("--positionX", `${moveX}px`)
}

favoriteRightButton.addEventListener('click', () => {
   if (favoritePage < favoriteMaxPage) {
      favoritePage += 1;
      moveSliderLine(favoriteLine, favoritePage, favoritePagelenght);
   }
})
favoriteLeftButton.addEventListener('click', () => {
   if (favoritePage > 0) {
      favoritePage -= 1;
      moveSliderLine(favoriteLine, favoritePage, favoritePagelenght);
   }
})

favoriteLine.addEventListener("pointerdown", (event) => {
   favoriteMoveble = true;
   const style = window.getComputedStyle(favoriteLine);
   const posX = parseInt(style.getPropertyValue("--positionX"));
   cursorPositionStart = event.pageX - posX;
   favoriteLine.style.setProperty("--slow", "0s");

   // console.log("start" + cursorPositionStart);
})

favoriteLine.addEventListener("pointerup", (event) => {
   favoriteMoveble = false;
   favoriteLine.style.setProperty("--slow", "0.7s");
})

favoriteLine.addEventListener("pointermove", (event) => {
   // let cursorPosition = event.pageX;

   if (!favoriteMoveble) {
      return;
   }
   let favorineLinePosition = event.pageX - cursorPositionStart;
   console.log(favorineLinePosition);
   if (favorineLinePosition > 100) {
      favoriteLine.style.setProperty("--slow", "0.7s");
      favoriteLine.style.setProperty("--positionX", `0px`)
      return;
   }
   else if (favorineLinePosition < -favoriteMaxPage * favoritePagelenght - 100) {
      favoriteLine.style.setProperty("--slow", "0.7s");
      favoriteLine.style.setProperty("--positionX", `${- favoriteMaxPage * favoritePagelenght}px`)
      return;
   }
   else {
      favoriteLine.style.setProperty("--positionX", `${favorineLinePosition}px`)
   }
})
