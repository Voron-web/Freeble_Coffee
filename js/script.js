//////////////// Slider

let favorite = {
   slider: document.querySelector(".favorite__slider-line"),
   cartsArray: document.getElementsByClassName("favorite__cart"),
   rightButton: document.querySelector(".favorite__right-button"),
   leftButton: document.querySelector(".favorite__left-button"),
   page: 0,
   maxPage: (document.getElementsByClassName("favorite__cart").length / 2 - 1),
   pageLeight: (document.querySelector(".favorite__cart").clientWidth + parseInt(getComputedStyle(document.querySelector(".favorite__slider-line")).columnGap)),
   cursorStart: 0,
   move: false,
   sliderPosition: 0,
};

let combo = {
   slider: document.querySelector('.combo__cart-line'),
   cartsArray: document.getElementsByClassName('combo__cart'),
   rightButton: document.querySelector('.combo__button-right'),
   leftButton: document.querySelector('.combo__button-left'),
   page: 0,
   maxPage: (document.getElementsByClassName('combo__cart').length - 1),
   pageLeight: ((document.getElementsByClassName('combo__cart'))[0].clientWidth + parseInt(getComputedStyle(document.querySelector('.combo__cart-line')).gap)),
   cursorStart: 0,
   move: false,
   sliderPosition: 0,
};

//slider ondrag deactivate

favorite.slider.ondragstart = function () {
   return false;
};
favorite.slider.onpointermove = function () {
   return false;
};
combo.slider.ondragstart = function () {
   return false;
};
combo.slider.onpointermove = function () {
   return false;
};


let moveSliderLine = function (obj, page, cartLenght) {
   const style = window.getComputedStyle(obj.slider);
   const posX = parseInt(style.getPropertyValue("--positionX"));
   let moveX = -page * cartLenght;
   obj.slider.style.setProperty("--positionX", `${moveX}px`);
   obj.sliderPosition = moveX;
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

checkButtons(favorite.leftButton, favorite.rightButton, favorite.page, favorite.maxPage);
checkButtons(combo.leftButton, combo.rightButton, combo.page, combo.maxPage);


// slider buttons click event

favorite.rightButton.addEventListener('click', (event) => {
   if (favorite.page < favorite.maxPage) {
      favorite.page++;
      moveSliderLine(favorite, favorite.page, favorite.pageLeight);
      checkButtons(favorite.leftButton, favorite.rightButton, favorite.page, favorite.maxPage);
   };
})

favorite.leftButton.addEventListener('click', () => {
   if (favorite.page > 0) {
      favorite.page--;
      moveSliderLine(favorite, favorite.page, favorite.pageLeight);
      favorite.rightButton.classList.remove("hidden");
      checkButtons(favorite.leftButton, favorite.rightButton, favorite.page, favorite.maxPage);
   }
})

combo.rightButton.addEventListener('click', () => {
   if (combo.page < combo.maxPage) {
      combo.page++;
      moveSliderLine(combo, combo.page, combo.pageLeight);
   }
   checkButtons(combo.leftButton, combo.rightButton, combo.page, combo.maxPage);
})

combo.leftButton.addEventListener('click', () => {
   if (combo.page > 0) {
      combo.page--;
      moveSliderLine(combo, combo.page, combo.pageLeight);
   }
   checkButtons(combo.leftButton, combo.rightButton, combo.page, combo.maxPage);
})


// slider drag event

let buttonDown = function (event, obj) {
   obj.move = true;
   const style = window.getComputedStyle(obj.slider);
   const posX = parseInt(style.getPropertyValue("--positionX"));
   obj.cursorStart = event.pageX - posX;
   obj.slider.style.setProperty("--slow", "0s");
}

let buttonUp = function (event, obj) {
   obj.move = false;
   if ((event.target !== obj.rightButton) & (event.target !== obj.leftButton)) {
      obj.slider.style.setProperty("--slow", "0.7s");
      obj.page = Math.round(-obj.sliderPosition / obj.pageLeight);
      moveSliderLine(obj, obj.page, obj.pageLeight);
      checkButtons(obj.leftButton, obj.rightButton, obj.page, obj.maxPage);
   }
}

let buttonMove = function (event, obj) {
   if (!obj.move) {
      return;
   }
   obj.sliderPosition = event.pageX - obj.cursorStart;
   if (obj.sliderPosition > 100) {
      obj.slider.style.setProperty("--slow", "0.7s");
      obj.slider.style.setProperty("--positionX", `0px`)
      obj.sliderPosition = 0;
      obj.move = false;
      return;
   }
   else if (obj.sliderPosition < -obj.maxPage * obj.pageLeight - 100) {
      obj.slider.style.setProperty("--slow", "0.7s");
      obj.slider.style.setProperty("--positionX", `${- obj.maxPage * obj.pageLeight}px`)
      obj.sliderPosition = -obj.maxPage * obj.pageLeight;
      obj.move = false;
      return;
   }
   else {
      obj.slider.style.setProperty("--positionX", `${obj.sliderPosition}px`)
   }
}


favorite.slider.addEventListener("pointerdown", (event) => {
   buttonDown(event, favorite);
})
combo.slider.addEventListener("pointerdown", (event) => {
   buttonDown(event, combo);
})

document.addEventListener("pointerup", (event) => {
   buttonUp(event, favorite);
   buttonUp(event, combo);
})

favorite.slider.addEventListener("pointermove", (event) => {
   buttonMove(event, favorite);
})
combo.slider.addEventListener("pointermove", (event) => {
   buttonMove(event, combo);
})


//////////////////////Buttons

const giftsetButtons = document.querySelectorAll(".giftset__button");
const giftsetCarts = document.querySelectorAll(".giftset__cart");
const giftsetCartText = document.querySelectorAll('.giftset__cart-text');
const giftsetCartFullText = document.querySelectorAll('.giftset__cart-fulltext');
const giftsetMoreBtn = document.querySelectorAll('.giftset__more-btn');


let symbolOnString = 0;

countSymbolOnString(0);
window.addEventListener('resize', () => {
   // console.log('resize');
   for (let i = 0; i < giftsetCartText.length; i++) {
      countSymbolOnString(i);
      // console.log(i);
   }
})

function countSymbolOnString(cart) {
   const text = giftsetCartFullText[cart].textContent;
   let tempDiv = document.createElement('div');
   tempDiv.classList.add('temp');
   document.body.append(tempDiv);
   let symbolLength = 0;
   let countLength = 0;
   symbolOnString = 0
   for (let symbolText of text) {
      let tempDomDiv = document.querySelector('.temp')
      tempDiv.innerHTML = symbolText;
      symbolLength = tempDiv.clientWidth;
      if (symbolLength === 0) {
         symbolLength = 7
      }
      else {
         symbolLength = tempDiv.clientWidth;
      }
      countLength = countLength + symbolLength + 2;
      symbolOnString++;

      if (countLength > giftsetCartFullText[cart].clientWidth) {
         break;
      }
   }
   tempDiv.remove();
   shortTextAdd(cart)
   // console.log(symbolOnString);
}

function shortTextAdd(index) {
   let shortTextLength = symbolOnString * 5;
   let shortText;
   // console.log(giftsetCartFullText[index].textContent.length);
   if (shortTextLength < giftsetCartFullText[index].textContent.length) {
      shortText = giftsetCartFullText[index].textContent.slice(0, shortTextLength);
      giftsetCartText[index].innerHTML = `${shortText} `;
      giftsetMoreBtn[index].classList.add('active');
      giftsetMoreBtn[index].addEventListener('click', () => giftsetShowFullText(index));
      giftsetCartText[index].append(giftsetMoreBtn[index]);

   }
   else {
      giftsetCartText[index].innerHTML = `${giftsetCartFullText[index].textConten} `;
   }
   // console.log(symbolOnString);
   // if (shortTextLength < )
   giftsetCartText[index].append(giftsetCartFullText[index]);
}
function giftsetShowFullText(index) {
   giftsetCartFullText[index].classList.add('show');
   document.addEventListener('mousedown', globalClick
   )
}

function globalClick() {
   giftsetCartFullText.forEach((element) => {
      element.classList.remove('show');
   })
   document.removeEventListener('mousedown', globalClick
   );
}

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
   item.addEventListener("click", () => {
      giftsetCartChange(index);
      countSymbolOnString(index);
   })

})