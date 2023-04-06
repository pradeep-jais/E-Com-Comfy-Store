// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';

// specific
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement, formatPrice } from '../utils.js';

// selections
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
const imgDOM = getElement('.single-product-img');
const titleDOM = getElement('.single-product-title');
const companyDOM = getElement('.single-product-company');
const priceDOM = getElement('.single-product-price');
const colorsDOM = getElement('.single-product-colors');
const descDOM = getElement('.single-product-desc');
const cartBtn = getElement('.addToCartBtn');

// cart product
let productID;

// show product when page loads
window.addEventListener('DOMContentLoaded', async function () {
  productID = window.location.search;
  try {
    const response = await fetch(`${singleProductUrl}${productID}`);
    if (response.status >= 200 && response.status <= 299) {
      const product = await response.json();

      displaySingleProduct(product);
    } else {
      centerDOM.innerHTML = `
        <div>
        <h3 class="error">sorry, product not found</h3>
        <a href="index.html" class="btn">back home</a>
        </div>
        `;
      throw new Error('The single product you are looking for is not found');
    }
  } catch (error) {
    console.log(error);
  }

  loading.style.display = 'none';
});

function displaySingleProduct(product) {
  // destuc
  const { id, fields } = product;
  productID = id;

  const { name, company, price, colors, description } = fields;
  const image = fields.image[0].thumbnails.large.url;

  document.title = `${name.toUpperCase()} | Comfy`;
  pageTitleDOM.textContent = `Home / ${name}`;
  imgDOM.src = image;
  titleDOM.textContent = name;
  companyDOM.textContent = `by ${company}`;
  priceDOM.textContent = formatPrice(price);
  descDOM.textContent = description;
  // colors
  colors.forEach((color) => {
    const span = document.createElement('span');
    span.classList.add('product-color');
    span.style.backgroundColor = color;
    colorsDOM.appendChild(span);
  });
}

cartBtn.addEventListener('click', function () {
  addToCart(productID);
  console.log(productID);
});
