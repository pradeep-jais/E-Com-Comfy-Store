import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupPrice = (store) => {
  const priceInput = getElement('.price-filter');
  const priceValue = getElement('.price-value');

  // filter setup
  let maxPrice = store.map((product) => product.price);
  maxPrice = Math.max(...maxPrice);
  maxPrice = Math.ceil(maxPrice / 100);
  priceInput.value = maxPrice;
  priceInput.max = maxPrice;
  priceInput.min = 0;
  priceValue.textContent = `Value : $${maxPrice}`;

  priceInput.addEventListener('input', function () {
    const value = parseInt(priceInput.value);
    priceValue.textContent = `Value : $${value}`;
    let newStore = store.filter((product) => product.price / 100 <= value);
    display(newStore, getElement('.products-container'));
    if (newStore.length < 1) {
      getElement(
        '.products-container'
      ).innerHTML = `<h3 class="filter-error">Sorry, no products mathed your search value</h3>`;
    }
  });
};

export default setupPrice;
