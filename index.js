let allProducts = [],
  buttons = [];
let container = document.getElementById("container");
// const main=document.getElementById("main");
var loader = document.createElement("div");
loader.className = "loader";
main.append(loader);
container.append(loader);
// api call in javascript

const fetchProducts = () => {
  // const response = await fetch('https://fakestoreapi.com/products');
  // const products = await response.json();
  // allProducts = products;
  localStorage.hasOwnProperty(allProducts)
    ? (allProducts = localStorage.getItem("allProducts"))
    : fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {
          document.querySelector(".loader").style.display = "none";
          allProducts = data;
          localStorage.setItem("allProducts", JSON.stringify(allProducts));
          renderProducts(allProducts);
        });
};

// Search feature
const search = document.getElementById("search-input");
search.addEventListener("keyup", async function () {
  const searchText = document
    .getElementById("search-input")
    .value.toLowerCase();
  const product = document.querySelectorAll(".main-div");
  const pname = container.getElementsByTagName("h3");
  for (let i = 0; i < pname.length; i++) {
    let match = product[i].getElementsByTagName("h3")[0];
    if (match) {
      let textvalue = match.textContent || match.innerHTML;
      if (textvalue.toLowerCase().indexOf(searchText) > -1) {
        product[i].style.display = "";
      } else {
        product[i].style.display = "none";
      }
    }
  }
});

// Add to cart
const getButtons = () => {
  buttons = document.getElementsByClassName("add-to-cart-btn");
  const addToCart = (e) => {
    const id = e.target.id;
    const cartSize = document.getElementById(id).value;
    const cartElement = {
      id: id,
      cartSize: cartSize,
    };
    localStorage.setItem(id, JSON.stringify(cartElement));
    // renderProducts(allProducts);
    updateCartCount();
    location.reload();
  };
  for (let button of buttons) {
    button.addEventListener("click", addToCart);
  }
};

// Remove item from cart
const getCross = () => {
  const removeFromCart = (e) => {
    const id = e.target.id;
    console.log(id, localStorage);
    localStorage.removeItem(id);
    console.log(localStorage);
    updateCartCount();
    location.reload();
  };
  const crossbtn = document.getElementsByClassName("crossDiv");
  for (let cross of crossbtn) {
    cross.addEventListener("click", removeFromCart);
  }
};

//cart count

const updateCartCount = () => {
  let count = 0;
  console.log("Inital", count);
  localStorage.removeItem("totalCartItem");
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key !== "allProducts") {
      const val = JSON.parse(localStorage.getItem(key));
      count = +count + +val.cartSize;
      console.log("ccccc", count, val.cartSize);
    }
  }
  localStorage.setItem("totalCartItem", count);
};

const renderProducts = (productsList) => {
  const totalCartItem = document.getElementById("lblCartCount");
  totalCartItem.innerText = localStorage.getItem("totalCartItem");
  productsList.forEach((product) => {
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("main-div");
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("imgDiv");
    const image = document.createElement("img");
    const btnDiv = document.createElement("div");
    btnDiv.classList.add("btn-div");
    const count = document.createElement("input");
    count.setAttribute("type", "number");
    const isItemInCart = JSON.parse(localStorage.getItem(product.id));
    count.setAttribute(
      "value",
      localStorage.hasOwnProperty(product.id) ? isItemInCart?.cartSize : 1
    );
    count.setAttribute("id", product.id);
    count.classList.add("input-box");
    const addToCartButton = document.createElement("button");
    // addToCartButton.setAttribute("onClick",addToCart)
    addToCartButton.classList.add("add-to-cart-btn");
    addToCartButton.setAttribute("id", product.id);
    image.classList.add("img");
    image.src = product.image;
    const textBlock = document.createElement("div");
    const crossDiv = document.createElement("div");
    crossDiv.classList.add("crossDiv");
    textBlock.classList.add("textBlock");
    const title = document.createElement("h3");
    title.textContent =
      product.title.length > 50
        ? `${product.title.substring(0, 50)}.... `
        : product.title;
    const price = document.createElement("h2");
    price.textContent = `$${product.price}`;
    addToCartButton.textContent = "Add to cart";
    const removeFromCart = document.createElement("h2");
    removeFromCart.classList.add("remove-item");
    removeFromCart.textContent = "X";
    removeFromCart.setAttribute("id", product.id);
    crossDiv.setAttribute("id", product.id);
    textBlock.append(title);
    textBlock.append(price);
    imgDiv.append(image);
    mainDiv.append(imgDiv);
    mainDiv.append(textBlock);
    btnDiv.append(count);
    btnDiv.append(addToCartButton);
    crossDiv.append(removeFromCart);
    localStorage.hasOwnProperty(product.id)
      ? btnDiv.append(crossDiv)
      : btnDiv.remove(crossDiv);
    mainDiv.append(btnDiv);
    container.append(mainDiv);
  });
  getButtons();
  getCross();
};

// setTimeout(() => {
//   main.remove(loader);
// }, 2000);
fetchProducts();
const navigateTroCart = () => {
  window.location.href = "./cart.html";
};
