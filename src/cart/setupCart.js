// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
// set items

const cartItemCountDOM = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

let cart = getStorageItem('cart');

export const addToCart = (id) => {
  let item = cart.find((cartItem) => cartItem.id === id);
  if (!item) {
    item = findProduct(id);
    // add item to cart
    item = { ...item, amount: 1 };
    cart = [...cart, item];
    // add item to the DOM
    addToCartDOM(item);
  } else {
    // update item count in cart
    increaseAmount(id);
  }
  // add one to the item count
  displayCartItemCount();

  // display cart totals price
  displayCartTotal();
  // set cart in local storage
  setStorageItem('cart', cart);
  openCart();
};

// total items in cart
function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemCountDOM.textContent = amount;
}

// Total price
function displayCartTotal() {
  const totalPrice = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount);
  }, 0);
  cartTotalDOM.textContent = `Total : ${formatPrice(totalPrice)}`;
}

function displayCartItemsDOM() {
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem);
  });
}

// increase item amount
function increaseAmount(id) {
  // update amount in cart
  let updatedAmount;
  cart = cart.map((item) => {
    if (item.id === id) {
      item.amount++;
      updatedAmount = item.amount;
      return item;
    } else {
      return item;
    }
  });
  setStorageItem('cart', cart);
  // update amount in DOM
  const cartItemAmountList = [
    ...document.querySelectorAll('.cart-item-amount'),
  ];
  cartItemAmountList.forEach((item) => {
    if (item.parentElement.parentElement.dataset.id === id) {
      item.textContent = updatedAmount;
    }
  });
}

// decrease item amount
function decreaseAmount(id) {
  // update amount in cart
  let updatedAmount;
  cart = cart.map((item) => {
    if (item.id === id) {
      item.amount--;
      updatedAmount = item.amount;
      return item;
    } else {
      return item;
    }
  });
  if (updatedAmount < 1) {
    removeItem(id);
    return;
  }

  // add updated cart to local storage
  setStorageItem('cart', cart);

  // update amount in DOM
  const cartItemAmountList = [
    ...document.querySelectorAll('.cart-item-amount'),
  ];
  cartItemAmountList.forEach((item) => {
    if (item.parentElement.parentElement.dataset.id === id) {
      item.textContent = updatedAmount;
    }
  });
}

// remove item
function removeItem(id) {
  // remove from local storage
  cart = cart.filter((item) => item.id != id);
  setStorageItem('cart', cart);

  // remove from cart DOM
  const cartItemList = [...cartItemsDOM.querySelectorAll('.cart-item')];

  cartItemList.forEach((item) => {
    if (item.dataset.id === id) {
      cartItemsDOM.removeChild(item);
    }
  });
}

// setup cart functionality
function cartFunctionality() {
  cartItemsDOM.addEventListener('click', function (e) {
    // increase amount
    const btn = e.target.parentElement;
    if (btn.classList.contains('cart-item-increase-btn')) {
      const id = e.target.parentElement.dataset.id;
      increaseAmount(id);
      // Alternate to DOM amount update
      // btn.nextElementSibling.textContent = newAmount;
      // In case return newAmount from increaseAmount()
    }

    // decrease amount
    if (btn.classList.contains('cart-item-decrease-btn')) {
      const id = e.target.parentElement.dataset.id;
      decreaseAmount(id);
      // btn.previousElementSibling.textContent = newAmount;
    }

    // remove item
    if (e.target.classList.contains('cart-item-remove-btn')) {
      const id = e.target.dataset.id;
      removeItem(id);

      // Alternate for what i'm doing in removeItem to remove item from DOM
      // e.target.parentElement.parentElement.remove();
    }
    // update values
    displayCartTotal();
    displayCartItemCount();
  });
}
// Initiate cart functionality
function init() {
  displayCartItemCount();

  displayCartTotal();

  // add all cart items to the DOM from local storage
  displayCartItemsDOM();

  cartFunctionality();
}
init();
