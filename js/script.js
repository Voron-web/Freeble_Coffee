
const favoriteLine = document.querySelector(".favorite__slider-line");
const favoriteCards = document.getElementsByClassName("favorite__cart");
const favoriteRightButton = document.querySelector(".favorite__right-button");
const favoriteLeftButton = document.querySelector(".favorite__left-button");

let favoritePage = 0;
let favoriteMaxPage = favoriteCards.length / 2 - 1;
let favoritePagelenght = document.querySelector(".favorite__cart").clientWidth + parseInt(getComputedStyle(favoriteLine).columnGap);
let cursorPositionStart;
let favoriteMoveble = false;
let favorineLinePosition = 0;

// Slider

favoriteLine.ondragstart = function () {
   return false;
};
favoriteLine.onpointermove = function () {
   return false;
};

let moveSliderLine = function (slider, page, lenght) {
   const style = window.getComputedStyle(slider);
   const posX = parseInt(style.getPropertyValue("--positionX"));
   let moveX = -page * lenght;
   favorineLinePosition = moveX;
   slider.style.setProperty("--positionX", `${moveX}px`);
}

let checkButtons = function (leftButton, rightButton, page, maxPage) {
   if (page == 0) {
      leftButton.classList.add("hidden")
      rightButton.classList.remove("hidden")
   }
   else if (page == maxPage) {
      rightButton.classList.add("hidden")
      leftButton.classList.remove("hidden")
   }
   else {
      rightButton.classList.remove("hidden")
      leftButton.classList.remove("hidden")
   }
}

checkButtons(favoriteLeftButton, favoriteRightButton, favoritePage, favoriteMaxPage);

favoriteRightButton.addEventListener('click', (event) => {
   if (favoritePage < favoriteMaxPage) {
      favoritePage++;
      moveSliderLine(favoriteLine, favoritePage, favoritePagelenght);
   };
   checkButtons(favoriteLeftButton, favoriteRightButton, favoritePage, favoriteMaxPage);
})

favoriteLeftButton.addEventListener('click', () => {
   if (favoritePage > 0) {
      favoritePage--;
      moveSliderLine(favoriteLine, favoritePage, favoritePagelenght);
      favoriteRightButton.classList.remove("hidden")
   }
   checkButtons(favoriteLeftButton, favoriteRightButton, favoritePage, favoriteMaxPage);

})
favoriteLine.addEventListener("pointerdown", (event) => {
   favoriteMoveble = true;
   const style = window.getComputedStyle(favoriteLine);
   const posX = parseInt(style.getPropertyValue("--positionX"));
   cursorPositionStart = event.pageX - posX;
   favoriteLine.style.setProperty("--slow", "0s");
})

document.addEventListener("pointerup", (event) => {
   console.log(event.target);
   favoriteMoveble = false;
   if ((event.target !== favoriteRightButton) & (event.target !== favoriteLeftButton)) {
      favoriteLine.style.setProperty("--slow", "0.7s");
      favoritePage = Math.round(-favorineLinePosition / favoritePagelenght);
      moveSliderLine(favoriteLine, favoritePage, favoritePagelenght)
   }
   checkButtons(favoriteLeftButton, favoriteRightButton, favoritePage, favoriteMaxPage);

})

favoriteLine.addEventListener("pointermove", (event) => {
   if (!favoriteMoveble) {
      return;
   }
   favorineLinePosition = event.pageX - cursorPositionStart;
   if (favorineLinePosition > 100) {
      favoriteLine.style.setProperty("--slow", "0.7s");
      favoriteLine.style.setProperty("--positionX", `0px`)
      favorineLinePosition = 0;
      favoriteMoveble = false;
      return;
   }
   else if (favorineLinePosition < -favoriteMaxPage * favoritePagelenght - 100) {
      favoriteLine.style.setProperty("--slow", "0.7s");
      favoriteLine.style.setProperty("--positionX", `${- favoriteMaxPage * favoritePagelenght}px`)
      favorineLinePosition = -favoriteMaxPage * favoritePagelenght;
      favoriteMoveble = false;
      return;
   }
   else {
      favoriteLine.style.setProperty("--positionX", `${favorineLinePosition}px`)
   }
})




//Buttons

const giftsetButtons = document.querySelectorAll(".giftset__button");
const giftsetCarts = document.querySelectorAll(".giftset__cart");

let giftsetCartChange = function (number) {
   giftsetButtons.forEach((element) => {
      element.classList.remove("active")
   });
   giftsetButtons[number].classList.add("active")
   giftsetCarts.forEach((element) => {
      element.classList.remove("active")
   });
   giftsetCarts[number].classList.add("active")
};

giftsetButtons.forEach((item, index) => {
   item.addEventListener("click", () =>
      giftsetCartChange(index))

})
