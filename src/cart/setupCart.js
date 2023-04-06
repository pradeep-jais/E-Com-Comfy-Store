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
  }
  // add one to the item count
  displayCartItemCount();
  // display cart totals
  displayCartTotal();
  // set cart in local storage
  setStorageItem('cart', cart);
  openCart();
};

function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemCountDOM.textContent = amount;
}
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

function init() {
  displayCartItemCount();

  displayCartTotal();

  // add all cart items to the DOM from local storage
  displayCartItemsDOM();
  // setup cart functionality
}
init();
