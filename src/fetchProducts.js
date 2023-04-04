import { allProductsUrl } from './utils.js';

const fetchProducts = async () => {
  try {
    const response = await fetch(allProductsUrl);
    if (!response.ok) throw new Error('Error');
    const products = await response.json();
    return products;
  } catch (error) {
    console.log(error);
  }
};

export default fetchProducts;
