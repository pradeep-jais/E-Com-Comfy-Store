#### Comfy Store: E-commerce web app

- To make font awesome icons of same width add "fa-fw" class to it

# price format

- Rounding off the decimal numbers may produce some unpredictable bugs in JavaScript. So avoid it by dealing money calculation in cents instead of dollar
- Format the price when we need to display for the user.
  eg:
  let formattedPrice = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  }).format((price / 100).toFixed(2));
- Stripe, a payment processor mainly calculate payments in cents only
