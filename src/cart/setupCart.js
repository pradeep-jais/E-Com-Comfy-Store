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
  openCart();
};

function init() {
  console.log(cart);
}
init();
