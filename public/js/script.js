//swiper
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});
//end swiper


//kiem tra localsotorage
const cart = localStorage.getItem("cart");
if (!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
}


//thong bao them vao gio hang thanh cong
const alertAddtocCardSuccess = () => {
  const alert = document.querySelector("[show-alert]");
  if (alert) {
    alert.classList.remove("alert-hidden");
    setTimeout(() => {
      alert.classList.add("alert-hidden");
    }, 3000);
    const closeBtn = alert.querySelector("[close-alert]");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        alert.classList.add("alert-hidden");
      });
    }
  }

}


//cap nhat so luong san pham trong gio hang
const updateMiniCart = () => {

  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    const miniCart = document.querySelector("[mini-cart]");
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    miniCart.innerHTML = totalQuantity;
  }


}
updateMiniCart();





//them san pham vao gio hang
const formAddToCart = document.querySelector("[form-add-to-cart]");

if (formAddToCart) {
  formAddToCart.addEventListener('submit', (e) => {
    e.preventDefault();
    const quantity = parseInt(e.target.elements.quantity.value);
    const tourId = parseInt(formAddToCart.getAttribute("tour-id"));

    if (quantity > 0 && tourId) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const existingItemIndex = cart.findIndex(item => item.tourId === tourId);
      if (existingItemIndex == -1) {
        cart.push({ tourId, quantity });
      } else {
        cart[existingItemIndex].quantity = cart[existingItemIndex].quantity + quantity;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      alertAddtocCardSuccess();
      updateMiniCart();
    }
  });
}




