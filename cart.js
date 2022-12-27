const productsList = JSON.parse(localStorage.getItem("allProducts"));
// console.log("Product List", productsList);
let exploreButton;
const container = document.getElementById("container");
let orderTotal = 0;
const renderProducts = () => {
 productsList && productsList.forEach((product) => {
    if (localStorage.hasOwnProperty(product.id)) {
      console.log("Product id", product.id);
      const mainDiv = document.createElement("div");
      const topDiv = document.createElement("div");
      mainDiv.classList.add("main-div");
      topDiv.classList.add("top-div");
      const imgDiv = document.createElement("div");
      imgDiv.classList.add("imgDiv");
      const image = document.createElement("img");
      const btnDiv = document.createElement("div");
      btnDiv.classList.add("btn-div");
      const count = document.createElement("input");
      count.setAttribute("type", "number");
      const isItemInCart = JSON.parse(localStorage.getItem(product.id));
      count.setAttribute("value", isItemInCart?.cartSize);
      count.setAttribute("id", product.id);
      count.classList.add("input-box");
      const addToCartButton = document.createElement("button");
      // addToCartButton.setAttribute("onClick",addToCart)
      addToCartButton.classList.add("add-to-cart-btn");
      addToCartButton.setAttribute("id", product.id);
      image.classList.add("img");
      image.src = product.image;
      const textBlock = document.createElement("div");
      const totalDiv = document.createElement("h3");
      totalDiv.classList.add("total");
      textBlock.classList.add("textBlock");
      const title = document.createElement("h3");
      title.textContent = product.title;
      const price = document.createElement("h3");
      price.textContent = `$${product.price}`;
      addToCartButton.textContent = "Add to cart";
      textBlock.append(title);
      textBlock.append(price);
      imgDiv.append(image);
      topDiv.append(imgDiv);
      topDiv.append(textBlock);
      const removeFromCart = document.createElement("div");
      removeFromCart.classList.add("remove-item");
      removeFromCart.textContent = "X";
      console.log(`remove-${product.id}`);
      removeFromCart.setAttribute("id", `remove-${product.id}`);
      mainDiv.append(removeFromCart);
      mainDiv.append(topDiv);
      btnDiv.append(count);
      btnDiv.append(addToCartButton);
      const total = +product.price * +isItemInCart.cartSize;
      orderTotal += total;
      totalDiv.textContent = `Total:   $ ${total} `;
      btnDiv.append(totalDiv);
      mainDiv.append(btnDiv);
      container.append(mainDiv);
    }
  });
  getButtons();
  getCross();
  if (localStorage.length > 2) {
    const OrderSummary = document.createElement("div");
    const amount = document.createElement("div");
    amount.classList.add("order-summary");
    OrderSummary.classList.add("summary");
    const cartTotal = document.createElement("h3");
    cartTotal.textContent = "Order Total";
    const totalAmount = document.createElement("h3");
    totalAmount.textContent = `$${orderTotal.toFixed(2)}`;
    amount.append(cartTotal);
    amount.append(totalAmount);
    OrderSummary.append(amount);
    const placeOrder = document.createElement("button");
    placeOrder.classList.add("btn");
    placeOrder.setAttribute("id", "place-order-btn")
    placeOrder.textContent = "Place Order";
    OrderSummary.append(placeOrder);
    container.append(OrderSummary);
    placeOrderClick();
  }else{
    const emptyCart= document.createElement("div");
    emptyCart.classList.add("empty-cart");
    const img= document.createElement("img");
    img.src="https://cdni.iconscout.com/illustration/premium/thumb/confusing-woman-due-to-empty-cart-4558760-3780056.png";
    emptyCart.append(img);
    const exploreBtn = document.createElement("button");
    exploreBtn.classList.add("explore-btn");
    exploreBtn.setAttribute("id","explore-btn");
    exploreBtn.textContent = "Let's explore some products to buy";
    
    container.append(emptyCart);
    container.append(exploreBtn);
    navigateToHome();
    
  }
};

// Add to cart
const getButtons = () => {
  buttons = document.getElementsByClassName("add-to-cart-btn");
  // console.log("Buttonsss", buttons);
  const addToCart = (e) => {
    const id = e.target.id;
    const cartSize = document.getElementById(id).value;
    console.log("iddddd", cartSize, id, e);
    const cartElement = {
      id: id,
      cartSize: cartSize,
    };
    console.log("Cart Element", cartElement);
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
    console.log(id.split("-")[1]);
    localStorage.removeItem(id.split("-")[1]);
    // console.log(localStorage);
    updateCartCount();
    location.reload();
  };
  const crossbtn = document.getElementsByClassName("remove-item");
  for (let cross of crossbtn) {
    cross.addEventListener("click", removeFromCart);
  }
};

//cart count

const updateCartCount = () => {
  let count = 0;
  // console.log("Inital",count);
  localStorage.removeItem("totalCartItem");
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key !== "allProducts") {
      const val = JSON.parse(localStorage.getItem(key));
      // console.log("vsal",val);
      count = +count + +val.cartSize;
      // console.log("ccccc",count, val.cartSize);
    }
  }
  localStorage.setItem("totalCartItem", count);
};
const navigateToHome = ()=>{
  console.log("clickkkk");
  
  exploreButton =document.getElementById("explore-btn");
  exploreButton.onclick= ()=>{
    window.location.href="./index.html";
  }
}

const placeOrderClick = () =>{
  console.log("PlaceOrderrrrr",document.getElementById("place-order-btn"));
document.getElementById("place-order-btn").onclick=()=>{
  localStorage.clear();
  Swal.fire("", "Thankyou! Your Order Placed Successfully", "success");
  setTimeout(() => {
    location.reload();
  }, 5000);
};

}


renderProducts();
