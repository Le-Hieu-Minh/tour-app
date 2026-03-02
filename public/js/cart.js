
//ham ve tour trong cart
const drawTour = () => {
  const cartData = localStorage.getItem('cart') || '[]'; // Lấy dữ liệu từ localStorage, nếu không có thì trả về mảng rỗng
  fetch("http://localhost:3000/cart/list-json", {
    method: 'POST', // Phải là POST khớp với route
    headers: {
      'Content-Type': 'application/json'
    },
    body: cartData // Dữ liệu từ localStorage thường đã là chuỗi JSON
  })
    .then(res => res.json())
    .then(data => {
      console.log("Dữ liệu trả về:", data);
      const htmlArray = data.tour.map((item, index) => {
        return `
          <tr>
            <td>${index + 1}</td>
            <td>
              <img src="${item.image}" alt=${item.info.title} width="80px" />
            </td>
            <td><a href="/tours/detail/${item.info.slug}">${item.info.title}</a></td>
            <td>$${item.price_special.toLocaleString()}</td>
            <td><input type="number" name="quantity" value=${item.quantity} min="1" item-id="${item.tourId}" style="width: 60px;" /></td>
            <td>$${item.total.toLocaleString()}</td>
            <td><button class="btn btn-sm btn-danger" btn-delete="${item.tourId}">Xóa</button></td>
          </tr>
        `;
      })


      const listTour = document.querySelector("[list-tour]");


      listTour.innerHTML = htmlArray.join("");
      const totalPrice = data.tour.reduce((total, item) => total + item.total, 0);

      const totalPriceElement = document.querySelector("[total-price]");
      totalPriceElement.innerHTML = totalPrice.toLocaleString();
      deleteTour();
      updateQuantity();
    })
    .catch(err => console.error("Lỗi fetch:", err));
}

//ham xoa tour trong cart
const deleteTour = () => {
  const deletebuttons = document.querySelectorAll("[btn-delete]");
  deletebuttons.forEach(button => {
    button.addEventListener("click", () => {
      const tourId = button.getAttribute("btn-delete");
      let cart = JSON.parse(localStorage.getItem('cart'));

      const newCart = cart.filter(item => item.tourId != tourId);

      localStorage.setItem('cart', JSON.stringify(newCart));
      drawTour();
    })
  });

}
//ham update tour trong cart
const updateQuantity = () => {
  const quantityInputs = document.querySelectorAll("[name='quantity']");


  quantityInputs.forEach(button => {
    button.addEventListener("change", () => {
      const tourId = parseInt(button.getAttribute("item-id"));
      const quantity = parseInt(button.value);
      console.log(tourId, quantity);

      let cart = JSON.parse(localStorage.getItem('cart'));


      const newCart = cart.find(item => item.tourId == tourId);
      newCart.quantity = quantity;
      console.log(newCart);


      localStorage.setItem('cart', JSON.stringify(cart));
      drawTour();
    })
  });

}

drawTour();

//dat tour 
const formOrder = document.querySelector("[form-order]");
if (formOrder) {
  formOrder.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = e.target.elements.fullName.value;
    const phone = e.target.elements.phone.value;
    const note = e.target.elements.note.value;
    const cart = JSON.parse(localStorage.getItem('cart'));
    const data = {
      info: {
        fullName: fullName,
        phone: phone,
        note: note
      },
      cart: cart
    }
    fetch("http://localhost:3000/order", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.code === 200) {
          localStorage.removeItem('cart');
          window.location.href = `/order/success?orderCode=${data.orderCode}`;
        }
      })

  });
}
