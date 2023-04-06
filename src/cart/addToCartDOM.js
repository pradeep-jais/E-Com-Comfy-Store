import { formatPrice, getElement } from '../utils.js';

const addToCartDOM = ({ id, name, price, image, amount }) => {
  const article = document.createElement('article');
  article.classList.add('cart-item');
  article.setAttribute('data-id', id);
  article.innerHTML = `
    <img
              src="${image}"
              class="cart-item-img"
              alt="${name}"
            />
            <!-- item info  -->
            <div>
              <h4 class="cart-item-name">${name}</h4>
              <p class="cart-item-price">${formatPrice(price)}</p>
              <button class="cart-item-remove-btn">remove</button>
            </div>
            <!-- amount toggle -->
            <div>
              <button class="cart-item-increase-btn">
                <i class="fas fa-chevron-up"></i>
              </button>
              <p class="cart-item-amount">${amount}</p>
              <button class="cart-item-increase-btn">
                <i class="fas fa-chevron-down"></i>
              </button>
            </div>
    `;
  getElement('.cart-items').appendChild(article);
};

export default addToCartDOM;
