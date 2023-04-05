import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupSearch = (store) => {
  const form = getElement('.input-form');
  const searchValue = getElement('.search-input');
  const container = getElement('.products-container');

  form.addEventListener('keyup', function () {
    const value = searchValue.value;
    if (value) {
      const filteredProducts = store.filter((item) => {
        let { name } = item;
        name = name.toLowerCase();
        // return name.includes(value);
        return name.startsWith(value);
      });
      display(filteredProducts, container);
      if (filteredProducts.length < 1) {
        container.innerHTML = `<h3 class="filter-error">Hey, Your search does not match with any products!</h3>`;
      }
    } else {
      display(store, container);
    }
  });
};

export default setupSearch;
